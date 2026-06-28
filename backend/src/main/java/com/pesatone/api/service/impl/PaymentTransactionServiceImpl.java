package com.pesatone.api.service.impl;

import com.blazebit.persistence.CriteriaBuilderFactory;
import com.blazebit.persistence.PagedList;
import com.blazebit.persistence.querydsl.BlazeJPAQuery;
import com.google.gson.Gson;
import com.pesatone.api.configuration.auth.RequestPrincipal;
import com.pesatone.api.configuration.properties.PaymentConfig;
import com.pesatone.api.exception.PesatoneNotFoundException;
import com.pesatone.api.model.dto.PaymentDto;
import com.pesatone.api.model.dto.TransactionDto;
import com.pesatone.api.model.dto.fdi.FdiRequest;
import com.pesatone.api.model.dto.flw.FlwTransactionDetail;
import com.pesatone.api.model.dto.flw.FlwTransactionDetailResponse;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.PaymentTransaction;
import com.pesatone.api.model.entity.QPaymentTransaction;
import com.pesatone.api.model.enumeration.PaymentProviderEnum;
import com.pesatone.api.model.enumeration.PaymentStatusEnum;
import com.pesatone.api.model.enumeration.RoleEnum;
import com.pesatone.api.model.pojo.DashboardPojo;
import com.pesatone.api.model.search.filter.TransactionSearchFilter;
import com.pesatone.api.model.search.response.QueryResultPojo;
import com.pesatone.api.model.search.response.TransactionSearchResponse;
import com.pesatone.api.repository.AppUserRepository;
import com.pesatone.api.repository.PaymentTransactionRepository;
import com.pesatone.api.service.PaymentProcessingService;
import com.pesatone.api.service.PaymentTransactionService;
import com.pesatone.api.service.payment.FdiService;
import com.pesatone.api.service.payment.FlutterWaveService;
import com.pesatone.api.service.payment.PoketMoneyService;
import com.pesatone.api.model.dto.poketmoney.PoketMoneyPaymentRequest;
import com.pesatone.api.model.dto.poketmoney.PoketMoneyStatusMapper;
import com.pesatone.api.util.AppUtil;
import com.querydsl.core.types.Projections;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentTransactionServiceImpl implements PaymentTransactionService {
    private final AppUserRepository appUserRepository;
    private final PaymentTransactionRepository paymentTransactionRepository;
    private final FlutterWaveService flutterWaveService;
    private final Gson gson;
    private final CriteriaBuilderFactory builderFactory;
    private final EntityManager entityManager;
    private final RequestPrincipal requestPrincipal;
    private final PaymentProcessingService paymentProcessingService;
    private final FdiService fdiService;
    private final PoketMoneyService poketMoneyService;
    private final PaymentConfig paymentConfig;

    @Override
    @Cacheable(value = "paymentTransaction", key = "#transactionReference")
    public PaymentTransaction getByTransactionReference(String transactionReference) {
        log.info("Getting from DB :{}", transactionReference);
        return paymentTransactionRepository.findByTransactionReference(transactionReference)
                .orElseThrow(() -> new PesatoneNotFoundException("Payment transaction not found"));
    }

    @Transactional
    @Override
    public PaymentTransaction initiateTransaction(TransactionDto dto) {
        AppUser creator = appUserRepository.findActiveByUserNameAndRole(dto.getCreatorUserName(), RoleEnum.CREATOR)
                .orElseThrow(() -> new PesatoneNotFoundException(
                        String.format("Creator with tag %s not found", dto.getCreatorUserName())));
        String txnRef = AppUtil.getTransactionReference("PT");
        PaymentTransaction transaction = new PaymentTransaction();
        transaction.setAmount(dto.getAmount());
        transaction.setCurrency(dto.getCurrency());
        transaction.setPaymentProvider(dto.getPaymentProvider());
        transaction.setPaymentStatus(PaymentStatusEnum.PENDING);
        transaction.setTransactionReference(txnRef);
        transaction.setDonorName(dto.getName());
        transaction.setDonorEmail(dto.getEmail());
        transaction.setNote(dto.getNote());
        transaction.setCreator(creator);
        appUserRepository.findActiveByUserNameAndRole(dto.getCreatorUserName(), RoleEnum.FAN)
                .ifPresent(transaction::setDonor);
        paymentTransactionRepository.save(transaction);

        if (dto.getPaymentProvider().equals(PaymentProviderEnum.FDI)) {
            fdiService.initiateTransaction(new FdiRequest(
                    txnRef,
                    paymentConfig.getFdiAccountId(),
                    AppUtil.getMSSIDN(dto.getPhoneNumber()),
                    dto.getAmount().toBigInteger().intValueExact(),
                    paymentConfig.getFdiPaymentCallbackUrl()),
                    true).block();
        } else if (dto.getPaymentProvider().equals(PaymentProviderEnum.POKET_MONEY)) {
            poketMoneyService.initiatePayment(
                    PoketMoneyPaymentRequest.builder()
                            .amount(dto.getAmount().toBigInteger().intValueExact())
                            .msisdn(AppUtil.getMSSIDN(dto.getPhoneNumber()))
                            .currency(dto.getCurrency().name())
                            .metadata(java.util.Map.of(
                                    "order_id", txnRef,
                                    "customer_name", dto.getName() != null ? dto.getName() : "Customer"))
                            .external_id(txnRef)
                            .callback_url(paymentConfig.getPoketMoneyCallbackUrlPayment())
                            .build()
            ).block();
        }

        return transaction;
    }

    @Override
    public Mono<PaymentTransaction> checkStatus(PaymentTransaction transaction) {
        if (transaction.canProcessPayment()) {
            if (transaction.getPaymentProvider().equals(PaymentProviderEnum.FDI)) {
                try {
                    return checkFdiTransactionDetail(transaction);
                } catch (Exception ex) {
                    log.error(ex.getMessage(), ex);
                }
            } else if (transaction.getPaymentProvider().equals(PaymentProviderEnum.POKET_MONEY)) {
                try {
                    return checkPoketMoneyTransactionDetail(transaction);
                } catch (Exception ex) {
                    log.error(ex.getMessage(), ex);
                }
            }
        }
        return Mono.just(transaction);
    }

    @Override
    public DashboardPojo getDashboardDetails(AppUser creator) {
        QPaymentTransaction qPaymentTransaction = QPaymentTransaction.paymentTransaction;
        BlazeJPAQuery<PaymentTransaction> blazeQuery = new BlazeJPAQuery<>(entityManager, builderFactory);

        blazeQuery.from(qPaymentTransaction)
                .where(qPaymentTransaction.paymentStatus.eq(PaymentStatusEnum.SUCCESSFUL)
                        .and(qPaymentTransaction.creator.eq(creator)));

        List<PaymentTransaction> transactions = blazeQuery
                .select(qPaymentTransaction).fetch();

        BigDecimal totalAmountReceived = transactions.stream()
                .map(x -> x.getAmount().subtract(x.getTransactionFee()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        Integer totalTransactions = transactions.size();
        BigDecimal biggestSupport = transactions.stream()
                .map(PaymentTransaction::getAmount)
                .max(Comparator.naturalOrder()).orElse(BigDecimal.ZERO);
        long totalSupporters = transactions.stream()
                .map(PaymentTransaction::getDonorEmail)
                .distinct()
                .count();

        return new DashboardPojo(totalAmountReceived, totalTransactions, totalSupporters, biggestSupport);
    }

    @Override
    public QueryResultPojo<TransactionSearchResponse> searchTransactions(TransactionSearchFilter filter) {
        QPaymentTransaction qPaymentTransaction = QPaymentTransaction.paymentTransaction;
        BlazeJPAQuery<PaymentTransaction> blazeQuery = new BlazeJPAQuery<>(entityManager, builderFactory);

        blazeQuery.from(qPaymentTransaction)
                .where(qPaymentTransaction.paymentStatus.eq(PaymentStatusEnum.SUCCESSFUL));

        if (requestPrincipal.isCreator()) {
            blazeQuery.where(qPaymentTransaction.creator.id.eq(requestPrincipal.getLoggedInUser().getId()));
        }

        if (StringUtils.isNotBlank(filter.getDonorName())) {
            blazeQuery.where(qPaymentTransaction.donorName.contains(filter.getDonorName()));
        }

        if (StringUtils.isNotBlank(filter.getStartDate())) {
            try {
                blazeQuery.where(qPaymentTransaction.paidAt.goe(AppUtil.getDateFromStringValue(filter.getStartDate())));
            } catch (ParseException ex) {
                log.error("Could not get start date {}", filter.getStartDate());
            }
        }

        if (StringUtils.isNotBlank(filter.getEndDate())) {
            try {
                blazeQuery.where(qPaymentTransaction.paidAt.loe(AppUtil.getDateFromStringValue(filter.getEndDate())));
            } catch (ParseException ex) {
                log.error("Could not get end date {}", filter.getEndDate());
            }
        }

        blazeQuery.orderBy(qPaymentTransaction.id.desc());

        PagedList<TransactionSearchResponse> pagedList = blazeQuery
                .select(Projections.constructor(
                        TransactionSearchResponse.class,
                        qPaymentTransaction.id,
                        qPaymentTransaction.amount,
                        qPaymentTransaction.transactionFee,
                        qPaymentTransaction.transactionReference,
                        qPaymentTransaction.paidAt,
                        qPaymentTransaction.note,
                        qPaymentTransaction.donorName,
                        qPaymentTransaction.currency,
                        qPaymentTransaction.creator.username,
                        qPaymentTransaction.creator.name,
                        qPaymentTransaction.creator.profileImageUrl))
                .fetchPage(filter.getOffset(), filter.getPageSize());

        return new QueryResultPojo<>(pagedList, filter.getPageNumber(), filter.getPageSize(),
                pagedList.getTotalPages());
    }

    private Mono<PaymentTransaction> checkFlwTransactionDetail(PaymentTransaction transaction) {
        return flutterWaveService.getTransactionDetail(transaction.getTransactionReference())
                .publishOn(Schedulers.boundedElastic())
                .map(response -> {
                    log.info("FLW transaction detail: {}", response);
                    FlwTransactionDetailResponse detailResponse = gson.fromJson(response,
                            FlwTransactionDetailResponse.class);
                    FlwTransactionDetail transactionDetail = detailResponse.getData();
                    return paymentProcessingService.processPayment(transaction, transactionDetail.getPaymentDto());
                })
                .onErrorResume(ex -> {
                    if (ex instanceof WebClientResponseException webClientException) {
                        log.error("FLUTTERWAVE API ERROR {} : {}", webClientException.getStatusCode(),
                                webClientException.getResponseBodyAsString());
                    } else {
                        log.error("FLUTTERWAVE API ERROR: {}", ex.getMessage());
                    }
                    return Mono.just(transaction);
                });
    }

    private Mono<PaymentTransaction> checkFdiTransactionDetail(PaymentTransaction transaction) {
        return fdiService.getTransactionDetail(transaction.getTransactionReference())
                .publishOn(Schedulers.boundedElastic())
                .map(response -> {
                    if (response.canProcess()) {
                        return paymentProcessingService.processPayment(transaction, new PaymentDto(
                                PaymentProviderEnum.FDI,
                                "momo-mtn-rw",
                                transaction.getAmount(),
                                transaction.getCurrency(),
                                response.getPaymentStatus(),
                                response.getData().getChannelRef(),
                                new Date()));
                    }else{
                        return transaction;
                    }
                })
                .onErrorResume(ex -> {
                    if (ex instanceof WebClientResponseException webClientException) {
                        log.error("FDI API ERROR {} : {}", webClientException.getStatusCode(),
                                webClientException.getResponseBodyAsString());
                    } else {
                        log.error("FDI API ERROR: {}", ex.getMessage());
                    }
                    return Mono.just(transaction);
                });
    }

    private Mono<PaymentTransaction> checkPoketMoneyTransactionDetail(PaymentTransaction transaction) {
        return poketMoneyService.checkPaymentStatus(transaction.getTransactionReference())
                .publishOn(Schedulers.boundedElastic())
                .map(response -> {
                    log.info("Poket Money transaction detail: status={}", response.getStatus());
                    return paymentProcessingService.processPayment(transaction, new PaymentDto(
                            PaymentProviderEnum.POKET_MONEY,
                            "mobile-money",
                            transaction.getAmount(),
                            transaction.getCurrency(),
                            PoketMoneyStatusMapper.mapStatus(response.getStatus()),
                            response.getId(),
                            new Date()));
                })
                .onErrorResume(ex -> {
                    if (ex instanceof WebClientResponseException webClientException) {
                        log.error("POKET_MONEY API ERROR {} : {}", webClientException.getStatusCode(),
                                webClientException.getResponseBodyAsString());
                    } else {
                        log.error("POKET_MONEY API ERROR: {}", ex.getMessage());
                    }
                    return Mono.just(transaction);
                });
    }

}

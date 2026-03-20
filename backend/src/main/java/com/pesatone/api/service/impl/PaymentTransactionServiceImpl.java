package com.pesatone.api.service.impl;

import com.blazebit.persistence.CriteriaBuilderFactory;
import com.blazebit.persistence.PagedList;
import com.blazebit.persistence.querydsl.BlazeJPAQuery;
import com.google.gson.Gson;
import com.pesatone.api.configuration.auth.RequestPrincipal;
import com.pesatone.api.exception.PesatoneNotFoundException;
import com.pesatone.api.model.dto.TransactionDto;
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
import com.pesatone.api.service.payment.FlutterWaveService;
import com.pesatone.api.util.AppUtil;
import com.querydsl.core.types.Projections;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.Comparator;
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

    @Override
    public PaymentTransaction getByTransactionReference(String transactionReference) {
        return paymentTransactionRepository.findByTransactionReference(transactionReference)
                .orElseThrow(() -> new PesatoneNotFoundException("Payment transaction not found"));
    }

    @Transactional
    @Override
    public PaymentTransaction initiateTransaction(TransactionDto dto) {
        PaymentTransaction transaction = new PaymentTransaction();
        transaction.setAmount(dto.getAmount());
        transaction.setCurrency(dto.getCurrency());
        transaction.setPaymentProvider(dto.getPaymentProvider());
        transaction.setPaymentStatus(PaymentStatusEnum.PENDING);
        transaction.setTransactionReference(AppUtil.getTransactionReference("PT"));
        transaction.setDonorName(dto.getName());
        transaction.setDonorEmail(dto.getEmail());
        transaction.setNote(dto.getNote());
        AppUser creator = appUserRepository.findActiveByUserNameAndRole(dto.getCreatorUserName(), RoleEnum.CREATOR)
                .orElseThrow(() -> new PesatoneNotFoundException(String.format("Creator with tag %s not found", dto.getCreatorUserName())));
        transaction.setCreator(creator);
        appUserRepository.findActiveByUserNameAndRole(dto.getCreatorUserName(), RoleEnum.FAN)
                .ifPresent(transaction::setDonor);
        return paymentTransactionRepository.save(transaction);
    }

    @Override
    public Mono<PaymentTransaction> checkStatus(PaymentTransaction transaction) {
        if (transaction.canProcessPayment() && (transaction.getPaymentProvider().equals(PaymentProviderEnum.FLUTTERWAVE))) {
            try {
                return checkFlwTransactionDetail(transaction);
            } catch (Exception ex) {
                log.error(ex.getMessage(), ex);
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
                .map(x-> x.getAmount().subtract(x.getTransactionFee()))
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
                        qPaymentTransaction.creator.profileImageUrl
                )).fetchPage(filter.getOffset(), filter.getPageSize());

        return new QueryResultPojo<>(pagedList, filter.getPageNumber(), filter.getPageSize(), pagedList.getTotalPages());
    }

    private Mono<PaymentTransaction> checkFlwTransactionDetail(PaymentTransaction transaction) {
        return flutterWaveService.getTransactionDetail(transaction.getTransactionReference())
                .publishOn(Schedulers.boundedElastic())
                .map(response -> {
                    log.info("FLW transaction detail: {}", response);
                    FlwTransactionDetailResponse detailResponse = gson.fromJson(response, FlwTransactionDetailResponse.class);
                    FlwTransactionDetail transactionDetail = detailResponse.getData();
                    return paymentProcessingService.processPayment(transaction, transactionDetail.getPaymentDto());
                })
                .onErrorResume(ex -> {
                    if (ex instanceof WebClientResponseException webClientException) {
                        log.error("FLUTTERWAVE API ERROR {} : {}", webClientException.getStatusCode(), webClientException.getResponseBodyAsString());
                    } else {
                        log.error("FLUTTERWAVE API ERROR: {}", ex.getMessage());
                    }
                    return Mono.just(transaction);
                });
    }
}

package com.pesatone.api.service.impl;

import com.blazebit.persistence.CriteriaBuilderFactory;
import com.blazebit.persistence.PagedList;
import com.blazebit.persistence.querydsl.BlazeJPAQuery;
import com.google.gson.Gson;
import com.pesatone.api.configuration.auth.RequestPrincipal;
import com.pesatone.api.configuration.properties.PaymentConfig;
import com.pesatone.api.exception.PesatoneException;
import com.pesatone.api.exception.PesatoneNotFoundException;
import com.pesatone.api.model.dto.PayoutDto;
import com.pesatone.api.model.dto.PayoutRequestDto;
import com.pesatone.api.model.dto.flw.*;
import com.pesatone.api.model.dto.poketmoney.PoketMoneyPaymentRequest;
import com.pesatone.api.model.dto.poketmoney.PoketMoneyStatusMapper;
import com.pesatone.api.model.entity.*;
import com.pesatone.api.model.enumeration.*;
import com.pesatone.api.model.pojo.WithdrawalAccountPojo;
import com.pesatone.api.model.search.filter.PayoutSearchFilter;
import com.pesatone.api.model.search.response.PayoutSearchResponse;
import com.pesatone.api.model.search.response.QueryResultPojo;
import com.pesatone.api.repository.PayoutRepository;
import com.pesatone.api.repository.WithdrawalAccountRepository;
import com.pesatone.api.service.*;
import com.pesatone.api.service.payment.FdiService;
import com.pesatone.api.service.payment.FlutterWaveService;
import com.pesatone.api.service.payment.PoketMoneyService;
import com.pesatone.api.util.AppUtil;
import com.querydsl.core.types.Projections;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class PayoutServiceImpl implements PayoutService {
    private final PayoutRepository payoutRepository;
    private final OtpService otpService;
    private final WalletService walletService;
    private final CriteriaBuilderFactory builderFactory;
    private final EntityManager entityManager;
    private final RequestPrincipal requestPrincipal;
    private final FlutterWaveService flutterWaveService;
    private final Gson gson;
    private final PaymentProcessingService paymentProcessingService;
    private final WithdrawalAccountService withdrawalAccountService;
    private final WithdrawalAccountRepository withdrawalAccountRepository;
    private final FdiService fdiService;
    private final PoketMoneyService poketMoneyService;
    private final PaymentConfig paymentConfig;

    @Override
    public Payout getByReference(String reference) {
        return payoutRepository.findByTransactionReference(reference)
                .orElseThrow(() -> new PesatoneNotFoundException("Payout not found"));
    }

    @Transactional
    @Override
    public Payout initiatePayout(AppUser creator, PayoutRequestDto dto) {
        Wallet wallet = walletService.getOrCreateWallet(creator, dto.getCurrency());
        validatePayoutRequest(creator, wallet, dto);
        Payout payout = new Payout();
        payout.setAmount(dto.getAmount());
        payout.setCurrency(dto.getCurrency());
        payout.setPaymentChannel(dto.getPaymentChannel());
        payout.setCreator(creator);
        payout.setWallet(wallet);
        payout.setPaymentStatus(PaymentStatusEnum.PENDING);
        payout.setPayoutProcessingStatus(PayoutProcessingStatusEnum.PENDING_EXECUTION);
        payout.setTransactionReference(AppUtil.getTransactionReference("WT"));

        if(payout.getPaymentChannel().equals(PayoutChannelEnum.MOBILE_MONEY)){
            WithdrawalAccount account = withdrawalAccountRepository.findByCreatorAndAccountType(creator, PayoutChannelEnum.MOBILE_MONEY)
                    .orElseThrow(() -> new PesatoneNotFoundException("No mobile money account found for the user"));

            initiatePoketMoneyPayout(payout, account).block();
        }else{
            throw new PesatoneNotFoundException("Withdrawal mode not supported. Try Mobile money");
        }

        return payoutRepository.save(payout);
    }

    @Override
    public QueryResultPojo<PayoutSearchResponse> searchPayouts(PayoutSearchFilter filter) {
        QPayout qPayout = QPayout.payout;
        BlazeJPAQuery<Payout> blazeQuery = new BlazeJPAQuery<>(entityManager, builderFactory);
        blazeQuery.from(qPayout);

        if (requestPrincipal.isCreator()) {
            blazeQuery.where(qPayout.creator.id.eq(requestPrincipal.getLoggedInUser().getId()));
        }
        if (filter.getCurrency() != null) {
            blazeQuery.where(qPayout.currency.eq(filter.getCurrency()));
        }
        if (filter.getPaymentStatus() != null) {
            blazeQuery.where(qPayout.paymentStatus.eq(filter.getPaymentStatus()));
        }
        if (requestPrincipal.isAdmin() && StringUtils.isNotBlank(filter.getCreatorTag())) {
            blazeQuery.where(qPayout.creator.username.containsIgnoreCase(filter.getCreatorTag()));
        }

        blazeQuery.orderBy(qPayout.id.desc());

        PagedList<PayoutSearchResponse> pagedList = blazeQuery
                .select(Projections.constructor(
                        PayoutSearchResponse.class,
                        qPayout.id,
                        qPayout.amount,
                        qPayout.currency,
                        qPayout.paymentChannel,
                        qPayout.paymentStatus,
                        qPayout.transactionReference,
                        qPayout.createdAt,
                        qPayout.processedAt,
                        qPayout.creator.username,
                        qPayout.creator.name,
                        qPayout.creator.profileImageUrl
                ))
                .fetchPage(filter.getOffset(), filter.getPageSize());

        return new QueryResultPojo<>(pagedList, filter.getPageNumber(), filter.getPageSize(), pagedList.getTotalPages());

    }

    @Override
    public List<Payout> fetchEligibleMomoPayouts(int batchSize) {
        QPayout qPayout = QPayout.payout;
        BlazeJPAQuery<Payout> blazeQuery = new BlazeJPAQuery<>(entityManager, builderFactory);
        blazeQuery.from(qPayout);
        blazeQuery.where(qPayout.currency.eq(CurrencyEnum.RWF)
                .and(qPayout.paymentStatus.eq(PaymentStatusEnum.PENDING)
                        .and(qPayout.payoutProcessingStatus.eq(PayoutProcessingStatusEnum.PENDING_EXECUTION))));

        blazeQuery.leftJoin(qPayout.creator).fetchJoin();

        blazeQuery.orderBy(qPayout.id.asc());

        return blazeQuery
                .select(qPayout)
                .fetchPage(0, batchSize);
    }

    @Override
    public Mono<Payout> checkMomoPayoutStatus(Payout payout) {
        if (payout.canProcessPayout() && (payout.getPaymentChannel().equals(PayoutChannelEnum.MOBILE_MONEY))) {
            try {
                return checkPoketMoneyPayoutStatus(payout);
            } catch (Exception ex) {
                log.error(ex.getMessage(), ex);
            }
        }
        return Mono.just(payout);
    }

    @Override
    public Mono<Payout> initiateMomoPayout(Payout transaction) {
        try {
            WithdrawalAccount account = withdrawalAccountRepository.findByCreatorAndAccountType(transaction.getCreator(), PayoutChannelEnum.MOBILE_MONEY)
                    .orElseThrow(() -> new PesatoneNotFoundException("No mobile money account found for the user"));
            initiatePoketMoneyPayout(transaction, account).block();
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
        }
        return Mono.just(transaction);
    }

    private void validatePayoutRequest(AppUser creator, Wallet wallet, PayoutRequestDto dto) {
        if (BooleanUtils.isNotTrue(creator.getVerified())) {
            throw new PesatoneException("Your account must be verified before you can proceed with withdrawals");
        }
        List<WithdrawalAccountPojo> withdrawalAccounts = withdrawalAccountService.getAccounts();
        if (withdrawalAccounts.isEmpty()) {
            throw new PesatoneException("You must set up your withdrawal account in settings tab before you can proceed");
        }

        if (dto.getPaymentChannel().equals(PayoutChannelEnum.MOBILE_MONEY) && withdrawalAccounts.stream().noneMatch(a -> a.getAccountType().equals(PayoutChannelEnum.MOBILE_MONEY))) {
            throw new PesatoneException("No mobile money information found. " +
                    "You must set up your withdrawal account in settings tab before you can proceed");
        }

        if (dto.getPaymentChannel().equals(PayoutChannelEnum.BANK_ACCOUNT) && withdrawalAccounts.stream().noneMatch(a -> a.getAccountType().equals(PayoutChannelEnum.BANK_ACCOUNT))) {
            throw new PesatoneException("No bank account information found. " +
                    "You must set up your withdrawal account in settings tab before you can proceed");
        }

        if (dto.getAmount().compareTo(wallet.getBalance()) > 0) {
            throw new PesatoneException("Insufficient balance");
        }
        if (payoutRepository.countPendingPayouts(wallet) > 0) {
            throw new PesatoneException("You already have pending payouts for this currency.");
        }
        boolean validOtp = otpService.verifyOtp(creator, OtpTypeEnum.PAYOUT, dto.getOtp());
        if (BooleanUtils.isFalse(validOtp)) {
            throw new PesatoneException("Cannot verify OTP. Please try again later");
        }
    }

    private Mono<String> initiateMomoTransfer(FlwPayoutRequestDto request) {
        return flutterWaveService.initiateMomoTransfer(request)
                .publishOn(Schedulers.boundedElastic())
                .map(response -> {
                    log.info("FLW payout detail: {}", response);
                    return "";
                })
                .onErrorResume(ex -> {
                    if (ex instanceof WebClientResponseException webClientException) {
                        log.error("FLUTTER WAVE PAYOUT INITIATION API ERROR {} : {}", webClientException.getStatusCode(), webClientException.getResponseBodyAsString());
                    } else {
                        log.error("FLUTTER WAVE PAYOUT INITIATION API ERROR: {}", ex.getMessage());
                    }
                    return Mono.just("");
                });
    }

    private Mono<Payout> initiatePoketMoneyPayout(Payout payout, WithdrawalAccount account) {
        PoketMoneyPaymentRequest request = PoketMoneyPaymentRequest.builder()
                .amount(payout.getAmount().intValueExact())
                .msisdn(AppUtil.getMSSIDN(account.getAccountNumber()))
                .currency(payout.getCurrency().name())
                .metadata(Map.of(
                        "transaction_reference", payout.getTransactionReference(),
                        "payment_channel", payout.getPaymentChannel().name(),
                        "creator_username", payout.getCreator().getUsername()))
                .external_id(payout.getTransactionReference())
                .callback_url(paymentConfig.getPoketMoneyCallbackUrlPayout())
                .build();

        return poketMoneyService.initiatePayout(request)
                .publishOn(Schedulers.boundedElastic())
                .map(response -> {
                    if (response != null) {
                        payout.setProviderReference(response.getId());
                        payout.setPayoutProcessingStatus(PayoutProcessingStatusEnum.PROCESSING);
                        payoutRepository.save(payout);
                    }
                    return payout;
                })
                .onErrorResume(ex -> {
                    if (ex instanceof WebClientResponseException webClientException) {
                        log.error("POKET MONEY PAYOUT INITIATION API ERROR {} : {}", webClientException.getStatusCode(), webClientException.getResponseBodyAsString());
                    } else {
                        log.error("POKET MONEY PAYOUT INITIATION API ERROR: {}", ex.getMessage());
                    }
                    return Mono.just(payout);
                });
    }

    private Mono<Payout> checkFlwPayoutDetail(Payout payout) {
        return flutterWaveService.getTransferDetail(payout.getTransactionReference())
                .publishOn(Schedulers.boundedElastic())
                .map(response -> {
                    FlwPayoutDetailResponseList detailResponse = gson.fromJson(response, FlwPayoutDetailResponseList.class);
                    if (detailResponse.getData() != null && !detailResponse.getData().isEmpty()) {
                        FlwPayoutDetail payoutDetail = detailResponse.getData().get(0);
                        return paymentProcessingService.processPayout(payout, new PayoutDto(payoutDetail));
                    } else {
                        return payout;
                    }
                })
                .onErrorResume(ex -> {
                    if (ex instanceof WebClientResponseException webClientException) {
                        log.error("FLUTTER WAVE API ERROR {} : {}", webClientException.getStatusCode(), webClientException.getResponseBodyAsString());
                    } else {
                        log.error("FLUTTER WAVE API ERROR: {}", ex.getMessage());
                    }
                    return Mono.just(payout);
                });
    }

    private Mono<Payout> checkFdiPayoutStatus(Payout payout) {
        return fdiService.getTransactionDetail(payout.getTransactionReference())
                .publishOn(Schedulers.boundedElastic())
                .map(response -> {
                    return paymentProcessingService.processPayout(payout, new PayoutDto(response, payout));
                })
                .onErrorResume(ex -> {
                    if (ex instanceof WebClientResponseException webClientException) {
                        log.error("FDI API ERROR {} : {}", webClientException.getStatusCode(), webClientException.getResponseBodyAsString());
                    } else {
                        log.error("FDI API ERROR: {}", ex.getMessage());
                    }
                    return Mono.just(payout);
                });
    }

    private Mono<Payout> checkPoketMoneyPayoutStatus(Payout payout) {
        return poketMoneyService.checkPayoutStatus(payout.getTransactionReference())
                .publishOn(Schedulers.boundedElastic())
                .map(response -> {
                    if (response == null) {
                        return payout;
                    }

                    PayoutDto payoutDto = new PayoutDto();
                    payoutDto.setPaymentProvider(PaymentProviderEnum.POKET_MONEY);
                    payoutDto.setAmount(payout.getAmount());
                    payoutDto.setCurrency(payout.getCurrency());
                    payoutDto.setPaymentStatus(PoketMoneyStatusMapper.mapStatus(response.getStatus()));
                    payoutDto.setProcessedAt(new Date());
                    return paymentProcessingService.processPayout(payout, payoutDto);
                })
                .onErrorResume(ex -> {
                    if (ex instanceof WebClientResponseException webClientException) {
                        log.error("POKET MONEY API ERROR {} : {}", webClientException.getStatusCode(), webClientException.getResponseBodyAsString());
                    } else {
                        log.error("POKET MONEY API ERROR: {}", ex.getMessage());
                    }
                    return Mono.just(payout);
                });
    }

}

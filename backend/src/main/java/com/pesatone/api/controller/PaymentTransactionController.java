package com.pesatone.api.controller;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.pesatone.api.configuration.properties.PaymentConfig;
import com.pesatone.api.model.dto.ApiResponseObject;
import com.pesatone.api.model.dto.PaymentDto;
import com.pesatone.api.model.dto.PayoutDto;
import com.pesatone.api.model.dto.TransactionDto;
import com.pesatone.api.model.dto.fdi.FdiResponse;
import com.pesatone.api.model.dto.flw.FlwCallBackDto;
import com.pesatone.api.model.dto.flw.FlwPayoutDetail;
import com.pesatone.api.model.dto.flw.FlwTransactionDetail;
import com.pesatone.api.model.dto.poketmoney.PoketMoneyCallbackPayload;
import com.pesatone.api.model.dto.poketmoney.PoketMoneyStatusMapper;
import com.pesatone.api.model.entity.PaymentTransaction;
import com.pesatone.api.model.entity.Payout;
import com.pesatone.api.model.enumeration.PaymentProviderEnum;
import com.pesatone.api.model.pojo.PaymentTransactionPojo;
import com.pesatone.api.model.search.filter.TransactionSearchFilter;
import com.pesatone.api.model.search.response.QueryResultPojo;
import com.pesatone.api.model.search.response.TransactionSearchResponse;
import com.pesatone.api.service.PaymentProcessingService;
import com.pesatone.api.service.PaymentTransactionService;
import com.pesatone.api.service.PayoutService;
import com.pesatone.api.util.AppUtil;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;

import org.apache.commons.lang3.StringUtils;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.time.Duration;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("transactions")
@Tag(name = "3. Transactions")
public class PaymentTransactionController {
    private final PaymentTransactionService paymentTransactionService;
    private final PaymentProcessingService paymentProcessingService;
    private final PayoutService payoutService;
    private final Gson gson;
    private final PaymentConfig paymentConfig;
    @Value("${application.statusNotificationDuration}")
    Integer statusNotificationDuration;

    @Value("${application.statusNotificationEventKey}")
    String statusNotificationEventKey;

    @Operation(summary = "Initiate Transaction", description = "Initiate payment transaction")
    @PostMapping("initiate")
    public ResponseEntity<ApiResponseObject<PaymentTransactionPojo>> initiateTransaction(
            @RequestBody @Valid TransactionDto dto,
            BindingResult bindingResult) throws BindException {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }

        PaymentTransaction transaction = paymentTransactionService.initiateTransaction(dto);

        return ResponseEntity.ok(new ApiResponseObject<>("Payment initiated successfully", true,
                new PaymentTransactionPojo(transaction)));
    }

    @Operation(summary = "Get Transaction Status", description = "Get payment transaction detail")
    @GetMapping("/{transactionReference}/status")
    public Mono<ResponseEntity<ApiResponseObject<PaymentTransactionPojo>>> getTransactionStatus(
            @PathVariable String transactionReference) {
        PaymentTransaction transaction = paymentTransactionService.getByTransactionReference(transactionReference);
        return paymentTransactionService.checkStatus(transaction)
                .map(txn -> ResponseEntity.ok(new ApiResponseObject<>("Transaction retrieved successfully",
                        true, new PaymentTransactionPojo(txn))));
    }

    @Operation(summary = "Get Transaction Status", description = "Get payment transaction detail")
    @GetMapping("/{transactionReference}/status-only")
    public Mono<ResponseEntity<String>> getTransactionStatusString(
            @PathVariable String transactionReference) {
        PaymentTransaction transaction = paymentTransactionService.getByTransactionReference(transactionReference);
        return Mono.just(ResponseEntity.ok(transaction.getPaymentStatus().name()));
    }

    @PostMapping(path = "{transactionReference}/sse" , produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> sendTransactionStatus(@PathVariable String transactionReference) {
         return Flux.interval(Duration.ofSeconds(statusNotificationDuration))
                .publishOn(Schedulers.parallel())
                .map(id -> {
                    PaymentTransaction transaction = paymentTransactionService.getByTransactionReference(transactionReference);
                    return ServerSentEvent.<String>builder()
                            .id(String.valueOf(id))
                            .event(statusNotificationEventKey)
                            .data(transaction.getPaymentStatus().name())
                            .comment("keep-alive")
                            .build();
                });
    }

    @Hidden
    @PostMapping("/flw/callback")
    public ResponseEntity<ApiResponseObject<String>> processFlutterWaveCallBack(@RequestBody FlwCallBackDto dto,
            @RequestHeader("verif-hash") String verifyHash) {
        log.info("Callback: {}: {}", gson.toJson(dto), verifyHash);
        AppUtil.verifyCallBack(verifyHash, paymentConfig.getFlwVerifyHash(), gson.toJson(dto));
        if (dto.isPaymentCallback()) {
            FlwTransactionDetail data = gson.fromJson(gson.toJson(dto.getData()),
                    new TypeToken<FlwTransactionDetail>() {
                    }.getType());
            PaymentTransaction transaction = paymentTransactionService.getByTransactionReference(data.getTx_ref());
            paymentProcessingService.processPayment(transaction, data.getPaymentDto());
        } else if (dto.isPayoutCallback()) {
            FlwPayoutDetail data = gson.fromJson(gson.toJson(dto.getData()), new TypeToken<FlwPayoutDetail>() {
            }.getType());
            Payout payout = payoutService.getByReference(data.getReference());
            paymentProcessingService.processPayout(payout, new PayoutDto(data));
        }
        return ResponseEntity.ok(new ApiResponseObject<>("Successful", true, "Notification received"));
    }

    @Hidden
    @PostMapping("/fdi/callback/payment")
    public ResponseEntity<ApiResponseObject<String>> processFDIPayment(@RequestBody FdiResponse dto) {
        log.info("FDI Payment Callback: {}: {}", gson.toJson(dto), dto);

        if (dto.getData() != null
                && StringUtils.isNotBlank(dto.getData().getState())
                && StringUtils.isNotBlank(dto.getData().getTrxRef())) {
            PaymentTransaction transaction = paymentTransactionService
                    .getByTransactionReference(dto.getData().getTrxRef());
            paymentProcessingService.processPayment(transaction, new PaymentDto(
                    PaymentProviderEnum.FDI,
                    "momo-mtn-rw",
                    transaction.getAmount(),
                    transaction.getCurrency(),
                    dto.getPaymentStatus(),
                    dto.getData().getChannelRef(),
                    new Date()));
        }
        return ResponseEntity.ok(new ApiResponseObject<>("Successful", true, "Notification received"));
    }

    @Hidden
    @PostMapping("/fdi/callback/payout")
    public ResponseEntity<ApiResponseObject<String>> processFDIPayout(@RequestBody FdiResponse dto) {
        log.info("FDI Payout Callback: {}: {}", gson.toJson(dto), dto);

        if (dto.getData() != null
                && StringUtils.isNotBlank(dto.getData().getState())
                && StringUtils.isNotBlank(dto.getData().getTrxRef())) {
            Payout payout = payoutService.getByReference(dto.getData().getTrxRef());
            paymentProcessingService.processPayout(payout, new PayoutDto(dto, payout));
        }
        return ResponseEntity.ok(new ApiResponseObject<>("Successful", true, "Notification received"));
    }

    @Operation(summary = "Search Payment Transactions", description = "Search Payment transactions")
    @GetMapping()
    public ResponseEntity<ApiResponseObject<QueryResultPojo<TransactionSearchResponse>>> searchPaymentTransactions(
            @ParameterObject @Valid TransactionSearchFilter filter) {
        return ResponseEntity.ok(new ApiResponseObject<>("Transactions retrieved successfully",
                true, paymentTransactionService.searchTransactions(filter)));
    }

    @Hidden
    @PostMapping("/poketmoney/callback/payment")
    public ResponseEntity<ApiResponseObject<String>> processPoketMoneyPayment(@RequestBody PoketMoneyCallbackPayload dto) {
        log.info("PoketMoney Payment Callback: {}", gson.toJson(dto));

        if (dto.getExternalId() != null && StringUtils.isNotBlank(dto.getExternalId())) {
            PaymentTransaction transaction = paymentTransactionService.getByTransactionReference(dto.getExternalId());
            paymentProcessingService.processPayment(transaction, new PaymentDto(
                    PaymentProviderEnum.POKET_MONEY,
                    "mobile-money",
                    transaction.getAmount(),
                    transaction.getCurrency(),
                    PoketMoneyStatusMapper.mapStatus(dto.getStatus()),
                    dto.getId(),
                    new Date()));
        }
        return ResponseEntity.ok(new ApiResponseObject<>("Successful", true, "Notification received"));
    }

    @Hidden
    @PostMapping("/poketmoney/callback/payout")
    public ResponseEntity<ApiResponseObject<String>> processPoketMoneyPayout(@RequestBody PoketMoneyCallbackPayload dto) {
        log.info("PoketMoney Payout Callback: {}", gson.toJson(dto));

        if (dto.getExternalId() != null && StringUtils.isNotBlank(dto.getExternalId())) {
            Payout payout = payoutService.getByReference(dto.getExternalId());
            PayoutDto payoutDto = new PayoutDto();
            payoutDto.setPaymentProvider(PaymentProviderEnum.POKET_MONEY);
            payoutDto.setAmount(payout.getAmount());
            payoutDto.setCurrency(payout.getCurrency());
            payoutDto.setPaymentStatus(PoketMoneyStatusMapper.mapStatus(dto.getStatus()));
            payoutDto.setProcessedAt(new Date());
            paymentProcessingService.processPayout(payout, payoutDto);
        }
        return ResponseEntity.ok(new ApiResponseObject<>("Successful", true, "Notification received"));
    }

}

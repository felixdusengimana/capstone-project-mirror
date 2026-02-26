package com.pesatone.api.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.pesatone.api.configuration.properties.PaymentConfig;
import com.pesatone.api.model.dto.ApiResponseObject;
import com.pesatone.api.model.dto.PayoutDto;
import com.pesatone.api.model.dto.TransactionDto;
import com.pesatone.api.model.dto.flw.FlwCallBackDto;
import com.pesatone.api.model.dto.flw.FlwPayoutDetail;
import com.pesatone.api.model.dto.flw.FlwTransactionDetail;
import com.pesatone.api.model.entity.PaymentTransaction;
import com.pesatone.api.model.entity.Payout;
import com.pesatone.api.model.pojo.PaymentTransactionPojo;
import com.pesatone.api.model.search.response.QueryResultPojo;
import com.pesatone.api.model.search.filter.TransactionSearchFilter;
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
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.io.IOException;

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
    private final ObjectMapper objectMapper;
    private final PaymentConfig paymentConfig;


    @Operation(summary = "Initiate Transaction", description = "Initiate payment transaction")
    @PostMapping("initiate")
    public ResponseEntity<ApiResponseObject<PaymentTransactionPojo>> initiateTransaction(@RequestBody @Valid TransactionDto dto,
                                                                          BindingResult bindingResult) throws BindException {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }

        PaymentTransaction transaction = paymentTransactionService.initiateTransaction(dto);

        return ResponseEntity.ok(new ApiResponseObject<>("Payment initiated successfully", true, new PaymentTransactionPojo(transaction)));
    }

    @Operation(summary = "Get Transaction Status", description = "Get payment transaction detail")
    @GetMapping("/{transactionReference}/status")
    public Mono<ResponseEntity<ApiResponseObject<PaymentTransactionPojo>>> getTransactionStatus(@PathVariable String transactionReference) {
        PaymentTransaction transaction = paymentTransactionService.getByTransactionReference(transactionReference);
        return paymentTransactionService.checkStatus(transaction)
                .map(txn -> ResponseEntity.ok(new ApiResponseObject<>("Transaction retrieved successfully",
                        true, new PaymentTransactionPojo(txn))));
    }

    @Hidden
    @PostMapping("/flw/callback")
    public ResponseEntity<ApiResponseObject<String>> processFlutterWaveCallBack(@RequestBody String requestBody,
                                                                                @RequestHeader("verif-hash") String verifyHash) {
        log.info("Callback: {}: {}", requestBody, verifyHash);

        AppUtil.verifyCallBack(verifyHash, paymentConfig.getFlwVerifyHash(), requestBody);
        FlwCallBackDto<?> dto =  getRequestObject(requestBody);
        if (dto == null) {
            return ResponseEntity.badRequest().body(new ApiResponseObject<>("Invalid request", false));
        }
        if(dto.isPaymentCallback()) {
            FlwCallBackDto<FlwTransactionDetail> request = (FlwCallBackDto<FlwTransactionDetail>) dto;
            PaymentTransaction transaction = paymentTransactionService.getByTransactionReference(request.getData().getTx_ref());
            paymentProcessingService.processPayment(transaction, request.getData().getPaymentDto());
        } else if (dto.isPayoutCallback()) {
            FlwCallBackDto<FlwPayoutDetail> request = (FlwCallBackDto<FlwPayoutDetail>) dto;
            Payout payout = payoutService.getByReference(request.getData().getReference());
            paymentProcessingService.processPayout(payout, new PayoutDto(request.getData()));
        }
        return ResponseEntity.ok(new ApiResponseObject<>("Successful", true, "Notification received"));
    }

    @Operation(summary = "Search Payment Transactions", description = "Search Payment transactions")
    @GetMapping()
    public ResponseEntity<ApiResponseObject<QueryResultPojo<TransactionSearchResponse>>> searchPaymentTransactions(@ParameterObject @Valid TransactionSearchFilter filter) {
        return ResponseEntity.ok(new ApiResponseObject<>("Transactions retrieved successfully",
                true,paymentTransactionService.searchTransactions(filter)));
    }

    private FlwCallBackDto<?> getRequestObject(String requestBody){
        try {
            return objectMapper.readValue(requestBody, new TypeReference<>() {});
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}

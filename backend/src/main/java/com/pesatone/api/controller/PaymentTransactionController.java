package com.pesatone.api.controller;

import com.google.gson.Gson;
import com.pesatone.api.configuration.properties.FlwConfig;
import com.pesatone.api.model.dto.ApiResponseObject;
import com.pesatone.api.model.dto.TransactionDto;
import com.pesatone.api.model.dto.flw.FlwCallBackDto;
import com.pesatone.api.model.entity.PaymentTransaction;
import com.pesatone.api.model.pojo.PaymentTransactionPojo;
import com.pesatone.api.service.PaymentTransactionService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("transactions")
@Tag(name = "3. Transactions")
public class PaymentTransactionController {
    private final PaymentTransactionService paymentTransactionService;
    private final Gson gson;
    private final FlwConfig flwConfig;


    @CrossOrigin
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

    @CrossOrigin
    @Operation(summary = "Get Transaction Status", description = "Get payment transaction detail")
    @GetMapping("/{transactionReference}/status")
    public Mono<ResponseEntity<ApiResponseObject<PaymentTransactionPojo>>> getTransactionStatus(@PathVariable String transactionReference) {
        PaymentTransaction transaction = paymentTransactionService.getByTransactionReference(transactionReference);
        return paymentTransactionService.checkStatus(transaction)
                .map(txn -> ResponseEntity.ok(new ApiResponseObject<>("Transaction retrieved successfully",
                        true, new PaymentTransactionPojo(txn))));
    }

    @Hidden
    @CrossOrigin
    @PostMapping("/flw/callback")
    public ResponseEntity<ApiResponseObject<String>> processFlutterWaveCallBack(@RequestBody @Valid FlwCallBackDto dto,
                                                                                     @RequestHeader("verif-hash") String verifyHash,
                                                                                     BindingResult bindingResult) throws BindException {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }

        verifyCallBack(verifyHash, dto);

        PaymentTransaction transaction = paymentTransactionService.getByTransactionReference(dto.getData().getTxRef());

        paymentTransactionService.processPayment(transaction, dto.getData().getPaymentDto());

        return ResponseEntity.ok(new ApiResponseObject<>("Successful", true, "Notification received"));
    }

    private void verifyCallBack(String verifyHash, FlwCallBackDto dto){
       if(!verifyHash.equals(flwConfig.getFlwVerifyHash())){
           log.error("Invalid hash {} for FLW callback {}",verifyHash,gson.toJson(dto));
           throw new IllegalArgumentException("We could not validate callback");
       }
    }
}

package com.pesatone.api.controller;

import com.pesatone.api.model.dto.ApiResponseObject;
import com.pesatone.api.model.dto.FlwCallBackDto;
import com.pesatone.api.model.dto.TransactionDto;
import com.pesatone.api.model.entity.PaymentTransaction;
import com.pesatone.api.service.PaymentTransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("transactions")
@Tag(name = "3. Transactions")
public class PaymentTransactionController {
    private final PaymentTransactionService paymentTransactionService;

    @CrossOrigin
    @Operation(summary = "Initiate Transaction", description = "Initiate payment transaction")
    @PostMapping("initiate")
    public ResponseEntity<ApiResponseObject<PaymentTransaction>> initiateTransaction(@RequestBody @Valid TransactionDto dto,
                                                                          BindingResult bindingResult) throws BindException {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }

        PaymentTransaction transaction = paymentTransactionService.initiateTransaction(dto);

        return ResponseEntity.ok(new ApiResponseObject<>("User signup successful", true, transaction));
    }

    @CrossOrigin
    @PostMapping("/flw/callback")
    public ResponseEntity<ApiResponseObject<Object>> processFlutterWaveCallBack(@RequestBody @Valid FlwCallBackDto dto,
                                                                                     @RequestHeader("verif-hash") String verifHash,
                                                                                     BindingResult bindingResult) throws BindException {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }

        paymentTransactionService.processPayment(dto);

        return ResponseEntity.ok(new ApiResponseObject<>("Notification received", true, "Notification received"));
    }
}

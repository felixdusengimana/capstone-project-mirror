package com.pesatone.api.service;

import com.pesatone.api.model.dto.PaymentDto;
import com.pesatone.api.model.dto.TransactionDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.PaymentTransaction;
import com.pesatone.api.model.pojo.DashboardPojo;
import reactor.core.publisher.Mono;

public interface PaymentTransactionService {
    PaymentTransaction getByTransactionReference(String transactionReference);

    PaymentTransaction initiateTransaction(TransactionDto dto);

    PaymentTransaction processPayment(PaymentTransaction transaction, PaymentDto paymentDto);

    Mono<PaymentTransaction> checkStatus(PaymentTransaction transaction);

    DashboardPojo getDashboardDetails(AppUser creator);
}

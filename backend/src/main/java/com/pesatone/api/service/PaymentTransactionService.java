package com.pesatone.api.service;

import com.pesatone.api.model.dto.PaymentDto;
import com.pesatone.api.model.dto.TransactionDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.PaymentTransaction;
import com.pesatone.api.model.pojo.DashboardPojo;
import com.pesatone.api.model.search.CreatorSearchFilter;
import com.pesatone.api.model.search.CreatorSearchResponse;
import com.pesatone.api.model.search.TransactionSearchFilter;
import com.pesatone.api.model.search.TransactionSearchResponse;
import com.querydsl.core.QueryResults;
import reactor.core.publisher.Mono;

public interface PaymentTransactionService {
    PaymentTransaction getByTransactionReference(String transactionReference);

    PaymentTransaction initiateTransaction(TransactionDto dto);

    PaymentTransaction processPayment(PaymentTransaction transaction, PaymentDto paymentDto);

    Mono<PaymentTransaction> checkStatus(PaymentTransaction transaction);

    DashboardPojo getDashboardDetails(AppUser creator);

    QueryResults<TransactionSearchResponse> searchTransactions(TransactionSearchFilter filter);
}

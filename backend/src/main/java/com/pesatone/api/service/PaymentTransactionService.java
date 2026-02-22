package com.pesatone.api.service;

import com.pesatone.api.model.dto.TransactionDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.PaymentTransaction;
import com.pesatone.api.model.pojo.DashboardPojo;
import com.pesatone.api.model.search.QueryResultPojo;
import com.pesatone.api.model.search.TransactionSearchFilter;
import com.pesatone.api.model.search.TransactionSearchResponse;
import reactor.core.publisher.Mono;

public interface PaymentTransactionService {
    PaymentTransaction getByTransactionReference(String transactionReference);

    PaymentTransaction initiateTransaction(TransactionDto dto);

    Mono<PaymentTransaction> checkStatus(PaymentTransaction transaction);

    DashboardPojo getDashboardDetails(AppUser creator);

    QueryResultPojo<TransactionSearchResponse> searchTransactions(TransactionSearchFilter filter);
}

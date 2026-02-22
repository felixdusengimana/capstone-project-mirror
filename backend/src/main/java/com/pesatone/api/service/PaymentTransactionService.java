package com.pesatone.api.service;

import com.pesatone.api.model.dto.TransactionDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.PaymentTransaction;
import com.pesatone.api.model.pojo.DashboardPojo;
import com.pesatone.api.model.search.response.QueryResultPojo;
import com.pesatone.api.model.search.filter.TransactionSearchFilter;
import com.pesatone.api.model.search.response.TransactionSearchResponse;
import reactor.core.publisher.Mono;

public interface PaymentTransactionService {
    PaymentTransaction getByTransactionReference(String transactionReference);

    PaymentTransaction initiateTransaction(TransactionDto dto);

    Mono<PaymentTransaction> checkStatus(PaymentTransaction transaction);

    DashboardPojo getDashboardDetails(AppUser creator);

    QueryResultPojo<TransactionSearchResponse> searchTransactions(TransactionSearchFilter filter);
}

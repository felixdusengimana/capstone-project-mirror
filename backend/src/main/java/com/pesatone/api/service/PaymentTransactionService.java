package com.pesatone.api.service;

import com.pesatone.api.model.dto.TransactionDto;
import com.pesatone.api.model.entity.PaymentTransaction;

public interface PaymentTransactionService {
    PaymentTransaction initiateTransaction(TransactionDto dto);
}

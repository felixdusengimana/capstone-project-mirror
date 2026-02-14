package com.pesatone.api.service.impl;

import com.pesatone.api.model.dto.TransactionDto;
import com.pesatone.api.model.entity.PaymentTransaction;
import com.pesatone.api.model.enumeration.PaymentStatusEnum;
import com.pesatone.api.service.PaymentTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PaymentTransactionServiceImpl implements PaymentTransactionService {

    @Transactional
    @Override
    public PaymentTransaction initiateTransaction(TransactionDto dto) {
        PaymentTransaction transaction = new PaymentTransaction();
        transaction.setAmount(dto.getAmount());
        transaction.setCurrency(dto.getCurrency());
        transaction.setPaymentChannel();
        transaction.setPaymentStatus(PaymentStatusEnum.PENDING);
        transaction.setTransactionReference();
        transaction.setDonorName(dto.getName());
        transaction.setNote(dto.getNote());
        transaction.setCreator();
        transaction.setDonor();


        return null;
    }
}

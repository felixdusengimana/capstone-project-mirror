package com.pesatone.api.service.impl;

import com.pesatone.api.exception.PesatoneNotFoundException;
import com.pesatone.api.model.dto.TransactionDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.PaymentTransaction;
import com.pesatone.api.model.enumeration.PaymentStatusEnum;
import com.pesatone.api.model.enumeration.RoleEnum;
import com.pesatone.api.repository.AppUserRepository;
import com.pesatone.api.repository.PaymentTransactionRepository;
import com.pesatone.api.service.PaymentTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentTransactionServiceImpl implements PaymentTransactionService {
    private final AppUserRepository appUserRepository;
    private final PaymentTransactionRepository paymentTransactionRepository;

    @Transactional
    @Override
    public PaymentTransaction initiateTransaction(TransactionDto dto) {
        PaymentTransaction transaction = new PaymentTransaction();
        transaction.setAmount(dto.getAmount());
        transaction.setCurrency(dto.getCurrency());
        transaction.setPaymentChannel(dto.getPaymentChannel());
        transaction.setPaymentStatus(PaymentStatusEnum.PENDING);
        transaction.setTransactionReference("PT-" + UUID.randomUUID().toString().replace("-", "")
                .substring(0, 10));
        transaction.setDonorName(dto.getName());
        transaction.setNote(dto.getNote());
        AppUser creator = appUserRepository.findActiveByUserNameAndRole(dto.getCreatorUserName(), RoleEnum.CREATOR)
                .orElseThrow(() -> new PesatoneNotFoundException(String.format("Creator with tag %s not found", dto.getCreatorUserName())));
        transaction.setCreator(creator);
//        transaction.setDonor();

        return paymentTransactionRepository.save(transaction);
    }
}

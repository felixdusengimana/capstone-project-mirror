package com.pesatone.api.service.impl;

import com.pesatone.api.configuration.properties.PaymentConfig;
import com.pesatone.api.model.dto.PaymentDto;
import com.pesatone.api.model.entity.PaymentTransaction;
import com.pesatone.api.model.entity.Payout;
import com.pesatone.api.model.entity.Wallet;
import com.pesatone.api.repository.PaymentTransactionRepository;
import com.pesatone.api.service.PaymentProcessingService;
import com.pesatone.api.service.WalletService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentProcessingServiceImpl implements PaymentProcessingService {
    private final PaymentTransactionRepository paymentTransactionRepository;
    private final PaymentConfig paymentConfig;
    private final WalletService walletService;
    @Override
    @Transactional
    public PaymentTransaction processPayment(PaymentTransaction transaction, PaymentDto paymentDto) {
        if(transaction.canProcessPayment() && isValidPayment(transaction, paymentDto)){
            transaction.setPaymentStatus(paymentDto.paymentStatus());
            transaction.setPaidAt(paymentDto.paidAt());
            transaction.setProviderReference(paymentDto.providerReference());
            transaction.setPaymentChannel(paymentDto.paymentChannel().toUpperCase());

            RoundingMode roundingMode = RoundingMode.HALF_UP;

            BigDecimal transactionFee =  transaction.getAmount()
                    .multiply(BigDecimal.valueOf(paymentConfig.getTransactionFeePercentage()))
                    .divide(BigDecimal.valueOf(100), roundingMode)
                    .setScale(2, roundingMode);

            transaction.setTransactionFee(transactionFee);

            Wallet wallet = walletService.getOrCreateWallet(transaction.getCreator(), transaction.getCurrency());
            walletService.credit(wallet, transaction);
            walletService.debit(wallet, transaction, transactionFee);

            return paymentTransactionRepository.save(transaction);
        }
        return transaction;
    }

    @Override
    public Payout processPayout(Payout payout) {
        return null;
    }


    private boolean isValidPayment(PaymentTransaction transaction, PaymentDto paymentDto){
        boolean isValid = true;
        String paymentError = "PAYMENT_ERROR";
        if(!transaction.getCurrency().equals(paymentDto.currency())){
            isValid = false;
            log.error("{} for {} : {}", paymentError, transaction.getTransactionReference(), "Mismatch currency"+paymentDto.currency());
        }
        if(transaction.getAmount().compareTo(paymentDto.amount()) < 0){
            isValid = false;
            log.error("{} for {} : {}", paymentError, transaction.getTransactionReference(), "Mismatch amount"+paymentDto.amount());
        }
        return isValid;
    }

}

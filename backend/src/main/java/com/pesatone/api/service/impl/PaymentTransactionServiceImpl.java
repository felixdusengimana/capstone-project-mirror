package com.pesatone.api.service.impl;

import com.pesatone.api.configuration.properties.FlwConfig;
import com.pesatone.api.exception.PesatoneNotFoundException;
import com.pesatone.api.model.dto.PaymentDto;
import com.pesatone.api.model.dto.TransactionDto;
import com.pesatone.api.model.dto.flw.FlwTransactionDetail;
import com.pesatone.api.model.dto.flw.FlwTransactionDetailResponse;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.PaymentTransaction;
import com.pesatone.api.model.enumeration.PaymentProviderEnum;
import com.pesatone.api.model.enumeration.PaymentStatusEnum;
import com.pesatone.api.model.enumeration.RoleEnum;
import com.pesatone.api.repository.AppUserRepository;
import com.pesatone.api.repository.PaymentTransactionRepository;
import com.pesatone.api.service.PaymentTransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentTransactionServiceImpl implements PaymentTransactionService {
    private final AppUserRepository appUserRepository;
    private final PaymentTransactionRepository paymentTransactionRepository;
    private final WebClient webClient;
    private final FlwConfig flwConfig;

    @Override
    public PaymentTransaction getByTransactionReference(String transactionReference) {
        return paymentTransactionRepository.findByTransactionReference(transactionReference)
                .orElseThrow(()-> new PesatoneNotFoundException("Payment transaction not found"));
    }

    @Transactional
    @Override
    public PaymentTransaction initiateTransaction(TransactionDto dto) {
        PaymentTransaction transaction = new PaymentTransaction();
        transaction.setAmount(dto.getAmount());
        transaction.setCurrency(dto.getCurrency());
        transaction.setPaymentProvider(dto.getPaymentProvider());
        transaction.setPaymentStatus(PaymentStatusEnum.PENDING);
        transaction.setTransactionReference("PT-" + UUID.randomUUID().toString().replace("-", "")
                .substring(0, 10));
        transaction.setDonorName(dto.getName());
        transaction.setNote(dto.getNote());
        AppUser creator = appUserRepository.findActiveByUserNameAndRole(dto.getCreatorUserName(), RoleEnum.CREATOR)
                .orElseThrow(() -> new PesatoneNotFoundException(String.format("Creator with tag %s not found", dto.getCreatorUserName())));
        transaction.setCreator(creator);
        appUserRepository.findActiveByUserNameAndRole(dto.getCreatorUserName(), RoleEnum.FAN)
                .ifPresent(transaction::setDonor);
        return paymentTransactionRepository.save(transaction);
    }

    @Override
    @Transactional
    public PaymentTransaction processPayment(PaymentTransaction transaction, PaymentDto paymentDto) {
        if(transaction.canProcessPayment() && isValidatePayment(transaction, paymentDto)){
            transaction.setPaymentStatus(paymentDto.paymentStatus());
            transaction.setPaidAt(paymentDto.paidAt());
            transaction.setProviderReference(paymentDto.providerReference());
            transaction.setPaymentChannel(paymentDto.paymentChannel());
            return paymentTransactionRepository.save(transaction);
        }
        return transaction;
    }

    @Override
    public Mono<PaymentTransaction> checkStatus(PaymentTransaction transaction) {
        if(transaction.canProcessPayment() && (transaction.getPaymentProvider().equals(PaymentProviderEnum.FLUTTERWAVE))){
                return checkFlwTransactionDetail(transaction);
        }
        return Mono.just(transaction);
    }

    private boolean isValidatePayment(PaymentTransaction transaction, PaymentDto paymentDto){
        boolean isValid = true;
        String paymentError = "PAYMENT_ERROR";
        if(!transaction.getCurrency().equals(paymentDto.currency())){
            isValid = false;
          log.error("{} for {} : {}", paymentError, transaction.getTransactionReference(), "Mismatch currency"+paymentDto.currency());
        }
        if(transaction.getAmount().compareTo(paymentDto.amount()) < 1){
            isValid = false;
            log.error("{} for {} : {}", paymentError, transaction.getTransactionReference(), "Mismatch amount"+paymentDto.amount());
        }
        return isValid;
    }

    private Mono<PaymentTransaction> checkFlwTransactionDetail(PaymentTransaction transaction){
        return webClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path(flwConfig.getFlwTransactionDetailUrl())
                        .queryParam("tx_ref", transaction.getTransactionReference())
                        .build())
                .header("Authorization", "Bearer "+flwConfig.getFlwSecretKey())
                .retrieve()
                .bodyToMono(FlwTransactionDetailResponse.class)
                .switchIfEmpty(Mono.error(new RuntimeException("Could not get transaction details from flutterwave")))
                .onErrorMap(WebClientResponseException.class, ex -> {
                    throw ex;
                })
                .map(response -> {
                    FlwTransactionDetail transactionDetail = response.getData();
                    return processPayment(transaction,transactionDetail.getPaymentDto());
                });
    }
}

package com.pesatone.api.model.pojo;

import com.pesatone.api.model.entity.PaymentTransaction;
import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.enumeration.PaymentProviderEnum;
import com.pesatone.api.model.enumeration.PaymentStatusEnum;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class PaymentTransactionPojo {
    private Long id;
    private BigDecimal amount;
    private CurrencyEnum currency;
    private PaymentProviderEnum paymentProvider;
    private String paymentChannel;
    private PaymentStatusEnum paymentStatus;
    private String transactionReference;
    private String providerReference;
    private String donorName;
    private String note;
    private Date paidAt;
    private Date createdAt;
    private String creatorUserName;

    public PaymentTransactionPojo(PaymentTransaction txn){
        setId(txn.getId());
        setAmount(txn.getAmount());
        setCurrency(txn.getCurrency());
        setPaymentProvider(txn.getPaymentProvider());
        setPaymentChannel(txn.getPaymentChannel());
        setPaymentStatus(txn.getPaymentStatus());
        setTransactionReference(txn.getTransactionReference());
        setProviderReference(txn.getProviderReference());
        setDonorName(txn.getDonorName());
        setNote(txn.getNote());
        setPaidAt(txn.getPaidAt());
        setCreatedAt(txn.getPaidAt());
        setCreatorUserName(txn.getCreator().getUsername());
    }
}

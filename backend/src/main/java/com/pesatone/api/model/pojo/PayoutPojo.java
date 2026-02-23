package com.pesatone.api.model.pojo;

import com.pesatone.api.model.entity.Payout;
import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.enumeration.PaymentStatusEnum;
import com.pesatone.api.model.enumeration.PayoutChannelEnum;
import com.pesatone.api.model.enumeration.PayoutProcessingStatusEnum;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class PayoutPojo {
    private Long id;
    private BigDecimal amount;
    private CurrencyEnum currency;
    private PayoutChannelEnum paymentChannel;
    private PaymentStatusEnum paymentStatus;
    private PayoutProcessingStatusEnum payoutProcessingStatus;
    private String transactionReference;
    private String providerReference;
    private Date createdAt;
    private Date processedAt;
    private String creatorUserName;

    public PayoutPojo(Payout payout) {
        setId(payout.getId());
        setAmount(payout.getAmount());
        setCurrency(payout.getCurrency());
        setPaymentChannel(payout.getPaymentChannel());
        setPaymentStatus(payout.getPaymentStatus());
        setPayoutProcessingStatus(payout.getPayoutProcessingStatus());
        setTransactionReference(payout.getTransactionReference());
        setProviderReference(payout.getProviderReference());
        setCreatedAt(payout.getCreatedAt());
        setProcessedAt(payout.getProcessedAt());
        if (Hibernate.isInitialized(payout.getCreator())) {
            setCreatorUserName(payout.getCreator().getUsername());
        }
    }
}

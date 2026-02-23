package com.pesatone.api.model.entity;

import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.enumeration.PaymentStatusEnum;
import com.pesatone.api.model.enumeration.PayoutChannelEnum;
import com.pesatone.api.model.enumeration.PayoutProcessingStatusEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Setter @Getter
public class Payout {
    @Id
    @GeneratedValue
    private Long id;

    private BigDecimal amount;

    @NotNull
    @Enumerated(EnumType.STRING)
    private CurrencyEnum currency;

    @NotNull
    @Enumerated(EnumType.STRING)
    private PayoutChannelEnum paymentChannel;

    @Enumerated(EnumType.STRING)
    private PaymentStatusEnum paymentStatus;

    @Enumerated(EnumType.STRING)
    private PayoutProcessingStatusEnum payoutProcessingStatus;

    @NotNull
    private String transactionReference;

    private String providerReference;

    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;

    private Date processedAt;

    @ManyToOne(fetch =  FetchType.LAZY, optional = false)
    private AppUser creator;

    @ManyToOne(fetch =  FetchType.LAZY, optional = false)
    private Wallet wallet;

    public boolean canProcessPayout(){
        return (paymentStatus != null &&
                List.of(PaymentStatusEnum.PENDING, PaymentStatusEnum.FAILED).contains(paymentStatus))
                && (payoutProcessingStatus != null &&
                List.of(PayoutProcessingStatusEnum.PROCESSING, PayoutProcessingStatusEnum.FAILED).contains(payoutProcessingStatus));
    }
}

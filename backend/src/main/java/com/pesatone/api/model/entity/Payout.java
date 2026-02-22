package com.pesatone.api.model.entity;

import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.enumeration.PaymentStatusEnum;
import com.pesatone.api.model.enumeration.PayoutChannelEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;

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
}

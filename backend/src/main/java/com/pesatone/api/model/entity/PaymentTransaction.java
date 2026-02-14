package com.pesatone.api.model.entity;

import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.enumeration.PaymentChannelEnum;
import com.pesatone.api.model.enumeration.PaymentStatusEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Setter
@Getter
@Table(uniqueConstraints= @UniqueConstraint(columnNames={"email","username"}))
public class PaymentTransaction {
    @Id
    @GeneratedValue
    private Long id;

    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private CurrencyEnum currency;

    @Enumerated(EnumType.STRING)
    private PaymentChannelEnum paymentChannel;

    @Enumerated(EnumType.STRING)
    private PaymentStatusEnum paymentStatus;

    @NotNull
    private String transactionReference;

    private String providerReference;

    private String donorName;

    private String note;

    private Date paidAt;

    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;

    @ManyToOne(fetch =  FetchType.LAZY, optional = false)
    private AppUser creator;

    @ManyToOne(fetch =  FetchType.LAZY)
    private AppUser donor;
}

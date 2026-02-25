package com.pesatone.api.model.entity;

import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.enumeration.PaymentProviderEnum;
import com.pesatone.api.model.enumeration.PaymentStatusEnum;
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
@Setter
@Getter
@Table(uniqueConstraints= @UniqueConstraint(columnNames={"transaction_reference"}))
public class PaymentTransaction {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private BigDecimal amount;

    private BigDecimal transactionFee;

    @NotNull
    @Enumerated(EnumType.STRING)
    private CurrencyEnum currency;

    @NotNull
    @Enumerated(EnumType.STRING)
    private PaymentProviderEnum paymentProvider;

    private String paymentChannel;

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

    public boolean canProcessPayment(){
        return paymentStatus != null &&
                List.of(PaymentStatusEnum.PENDING, PaymentStatusEnum.FAILED).contains(paymentStatus);
    }

    public boolean isSuccessful(){
        return paymentStatus != null && paymentStatus.equals(PaymentStatusEnum.SUCCESSFUL);
    }
}

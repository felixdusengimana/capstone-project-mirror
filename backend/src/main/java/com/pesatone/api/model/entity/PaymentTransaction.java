package com.pesatone.api.model.entity;

import com.pesatone.api.model.enumeration.PaymentChannelEnum;
import com.pesatone.api.model.enumeration.PaymentStatusEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Setter
@Getter
public class PaymentTransaction {
    @Id
    @GeneratedValue
    private Long id;

    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private PaymentChannelEnum paymentChannel;

    @Enumerated(EnumType.STRING)
    private PaymentStatusEnum paymentStatus;

    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;

    @ManyToOne(fetch =  FetchType.LAZY, optional = false)
    private AppUser creator;
}

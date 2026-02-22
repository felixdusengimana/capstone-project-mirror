package com.pesatone.api.model.entity;

import com.pesatone.api.model.enumeration.LedgerTypeEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Getter
@Setter
public class WalletLedger {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private BigDecimal amount;

    private String narration;

    @CreationTimestamp
    private Date createdAt;

    @NotNull
    @Enumerated(EnumType.STRING)
    private LedgerTypeEnum ledgerType;

    @ManyToOne(fetch =  FetchType.LAZY, optional = false)
    private Wallet wallet;

    @ManyToOne(fetch =  FetchType.LAZY)
    private PaymentTransaction paymentTransaction;

    @ManyToOne(fetch =  FetchType.LAZY)
    private Payout payout;
}

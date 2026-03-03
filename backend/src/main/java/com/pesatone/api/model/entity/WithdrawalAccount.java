package com.pesatone.api.model.entity;

import com.pesatone.api.model.enumeration.PayoutChannelEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Entity
@Getter @Setter
public class WithdrawalAccount {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private PayoutChannelEnum accountType;

    @NotNull
    private String accountNumber;

    private String accountName;

    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;

    @ManyToOne(fetch =  FetchType.LAZY, optional = false)
    private AppUser creator;

    @ManyToOne(fetch =  FetchType.LAZY)
    private Bank bank;
}

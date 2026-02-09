package com.pesatone.api.model.entity;

import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.enumeration.StatusEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Entity
@Getter @Setter
public class Country {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String code;

    @Enumerated(EnumType.STRING)
    private CurrencyEnum currency;

    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;

    @Enumerated(EnumType.STRING)
    @NotNull
    private StatusEnum status;
}

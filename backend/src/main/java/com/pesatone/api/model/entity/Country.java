package com.pesatone.api.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.enumeration.StatusEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.util.Date;

@Entity
@Getter @Setter
public class Country implements Serializable{
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String name;

    private String isoCode;

    private String countryCode;

    @Enumerated(EnumType.STRING)
    private CurrencyEnum currency;

    @JsonIgnore
    @CreationTimestamp
    private Date createdAt;

    @JsonIgnore
    @UpdateTimestamp
    private Date updatedAt;

    @JsonIgnore
    @Enumerated(EnumType.STRING)
    @NotNull
    private StatusEnum status;
}

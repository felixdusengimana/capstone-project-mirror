package com.pesatone.api.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pesatone.api.model.enumeration.SocialPlatformEnum;
import com.pesatone.api.model.enumeration.StatusEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;

@Getter
@Setter
@Entity
@SQLRestriction("status = 'ACTIVE'")
public class SocialLink {
    @Id
    @GeneratedValue
    private Long id;

    private String link;

    @NotNull
    @Enumerated(EnumType.STRING)
    private SocialPlatformEnum platform;

    @JsonIgnore
    @NotNull
    @Enumerated(EnumType.STRING)
    private StatusEnum status;

    @JsonIgnore
    @ManyToOne(optional = false, fetch =  FetchType.LAZY)
    private AppUser appUser;
}

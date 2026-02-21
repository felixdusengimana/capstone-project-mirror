package com.pesatone.api.model.entity;

import com.pesatone.api.model.enumeration.NotificationChannelEnum;
import com.pesatone.api.model.enumeration.OtpTypeEnum;
import com.pesatone.api.model.enumeration.StatusEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Entity
@Getter @Setter
public class OneTimePassword {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String otp;

    private Date createdAt;

    private Date expiryAt;

    @UpdateTimestamp
    private Date updatedAt;

    private Boolean expired;

    @Enumerated(EnumType.STRING)
    @NotNull
    private OtpTypeEnum type;

    @Enumerated(EnumType.STRING)
    @NotNull
    private NotificationChannelEnum notificationChannel;

    @ManyToOne(fetch =  FetchType.LAZY)
    private AppUser appUser;
}

package com.pesatone.api.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pesatone.api.model.enumeration.ApprovalStatusEnum;
import com.pesatone.api.model.enumeration.RoleEnum;
import com.pesatone.api.model.enumeration.StatusEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(name = "uk_app_user_email", columnNames = "email"),
        @UniqueConstraint(name = "uk_app_user_username", columnNames = "username")
})
@Getter @Setter
public class AppUser implements Serializable{
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @Email
    private String email;

    private String username;

    private String name;

    private String phoneNumber;

    private String profileImageUrl;

    private String verificationImageUrl;

    @NotNull
    @JsonIgnore
    private String password;

    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;

    @Enumerated(EnumType.STRING)
    @NotNull
    private StatusEnum status;

    @Enumerated(EnumType.STRING)
    private ApprovalStatusEnum approvalStatus;

    @Enumerated(EnumType.STRING)
    @NotNull
    @JsonIgnore
    private RoleEnum role;

    private Boolean verified = false;

    private Boolean emailVerified = false;

    private Boolean phoneNumberVerified = false;

    private String bio;

    @JsonIgnore
    @ManyToOne(fetch =  FetchType.LAZY)
    private Country country;

    @JsonIgnore
    @ManyToOne(fetch =  FetchType.LAZY)
    private Industry industry;
}

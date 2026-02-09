package com.pesatone.api.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pesatone.api.model.enumeration.StatusEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Entity
@Table(
        uniqueConstraints= @UniqueConstraint(columnNames={"email"})
)
@Getter @Setter
public class AppUser {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @Email
    private String email;

    @NotNull
    private String name;

    private String phoneNumber;

    private String profileImageUrl;

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
}

package com.pesatone.api.model.dto;

import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.NotBlank;

@Getter
@Setter
public class LoginRequest {
    @NotBlank(message = "username/email is required")
    private String username;

    @NotBlank(message = "password is required")
    private String password;
}

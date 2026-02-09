package com.pesatone.api.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class InitiateResetPasswordDto {
    @NotBlank(message = "Email is required")
    @Email(message = "Email is not valid")
    @Schema(name = "email",
            description = "user email",
            example = "user@mail.com", requiredMode = Schema.RequiredMode.REQUIRED)
    private String email;
}

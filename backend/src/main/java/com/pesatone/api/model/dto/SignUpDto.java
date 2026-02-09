package com.pesatone.api.model.dto;

import com.pesatone.api.model.validator.UniqueUserEmail;
import com.pesatone.api.model.validator.ValidPassword;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Getter @Setter
public class SignUpDto {
    @NotBlank(message = "Email is required")
    @Email(message = "Email is not valid")
    @Schema(name = "email",
            description = "A non-existing user email",
            example = "user@mail.com", requiredMode = Schema.RequiredMode.REQUIRED)
    @UniqueUserEmail
    private String email;

    @NotBlank(message = "Password is required")
    @Schema(name = "password",
            description = "A valid password. Password must be up to 8 characters and must contain lowercase, uppercase and number",
            example = "P123@ssword", requiredMode = Schema.RequiredMode.REQUIRED)
    @ValidPassword
    private String password;
}

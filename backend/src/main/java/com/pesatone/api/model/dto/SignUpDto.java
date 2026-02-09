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
//    @UniqueUserEmail
    private String email;

    @NotBlank(message = "Password is required")
    @Schema(name = "password",
            description = "A non-existing user email",
            example = "user@mail.com", requiredMode = Schema.RequiredMode.REQUIRED)
//    @ValidPassword
    private String password;

    @NotBlank(message = "Name is required")
    @Schema(name = "name",
            description = "Your full name",
            example = "Okoro Herbert", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

}

package com.pesatone.api.model.dto;

import com.pesatone.api.model.validator.ValidPassword;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ResetPasswordDto {
    @NotBlank(message = "Password is required")
    @Schema(name = "password",
            description = "A valid password. Password must be up to 8 characters and must contain lowercase, uppercase and number",
            example = "P123@ssword", requiredMode = Schema.RequiredMode.REQUIRED)
    @ValidPassword
    private String password;

    @NotBlank(message = "Token is required")
    @Schema(name = "token",
            description = "Reset token",
            example = "reset token", requiredMode = Schema.RequiredMode.REQUIRED)
    private String token;
}

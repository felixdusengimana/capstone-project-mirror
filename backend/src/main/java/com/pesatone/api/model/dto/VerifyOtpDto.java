package com.pesatone.api.model.dto;

import com.pesatone.api.model.enumeration.OtpTypeEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyOtpDto {
    @NotNull(message = "Otp type is required")
    @Schema(name = "otpType",
            description = "otp type",
            example = "EMAIL", requiredMode = Schema.RequiredMode.REQUIRED)
    private OtpTypeEnum otpType;

    @NotBlank(message = "Otp is required")
    @Schema(name = "otp",
            description = "The one time password you received",
            example = "123456", requiredMode = Schema.RequiredMode.REQUIRED)
    private String otp;
}

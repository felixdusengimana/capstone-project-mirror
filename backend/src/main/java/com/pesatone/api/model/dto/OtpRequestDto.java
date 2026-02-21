package com.pesatone.api.model.dto;

import com.pesatone.api.model.enumeration.OtpTypeEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OtpRequestDto {
    @NotNull(message = "Otp type is required")
    @Schema(name = "otpType",
            description = "otp type",
            example = "EMAIL_VERIFICATION", requiredMode = Schema.RequiredMode.REQUIRED)
    private OtpTypeEnum otpType;
}

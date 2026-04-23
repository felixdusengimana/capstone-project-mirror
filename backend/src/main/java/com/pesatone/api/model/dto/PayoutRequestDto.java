package com.pesatone.api.model.dto;

import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.enumeration.PayoutChannelEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class PayoutRequestDto {
    @NotNull(message = "Amount is required")
    @Min(value = 100, message = "amount cannot be less than 100")
    @Schema(name = "amount",
            description = "Withdrawal amount",
            example = "10000", requiredMode = Schema.RequiredMode.REQUIRED)
    private BigDecimal amount;

    @NotNull(message = "Payment Channel is required")
    @Schema(name = "paymentChannel",
            description = "Withdrawal payment channel",
            example = "BANK_ACCOUNT", requiredMode = Schema.RequiredMode.REQUIRED)
    private PayoutChannelEnum paymentChannel;

    @NotNull(message = "currency is required")
    @Schema(name = "currency",
            description = "Withdrawal currency",
            example = "RWF", requiredMode = Schema.RequiredMode.REQUIRED)
    private CurrencyEnum currency;

    @NotBlank(message = "Otp is required")
    @Schema(name = "otp",
            description = "The one time password you received",
            example = "123456", requiredMode = Schema.RequiredMode.REQUIRED)
    private String otp;
}

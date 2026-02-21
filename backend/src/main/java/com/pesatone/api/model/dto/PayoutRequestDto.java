package com.pesatone.api.model.dto;

import com.pesatone.api.model.enumeration.PayoutChannelEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class PayoutRequestDto {
    @NotNull(message = "Amount is required")
    @Schema(name = "amount",
            description = "Withdrawal amount",
            example = "10000", requiredMode = Schema.RequiredMode.REQUIRED)
    private BigDecimal amount;

    @NotNull(message = "Payment Channel is required")
    @Schema(name = "paymentChannel",
            description = "Withdrawal payment channel",
            example = "BANK_ACCOUNT", requiredMode = Schema.RequiredMode.REQUIRED)
    private PayoutChannelEnum paymentChannel;
}

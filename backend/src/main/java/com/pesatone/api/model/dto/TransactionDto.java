package com.pesatone.api.model.dto;

import com.pesatone.api.model.enumeration.CurrencyEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class TransactionDto {
    @Schema(name = "creatorTag",
            description = "Message to your favorite creator",
            example = "Say something nicem")
    private String creatorTag;

    @Schema(name = "amount",
            description = "amount you want to gift",
            example = "1000")
    @NotNull(message = "amount is required")
    @Min(value = 1, message = "amount cannot be less than 1")
    private BigDecimal amount;

    @Schema(name = "currency",
            description = "Currency of gift",
    example = "RWF")
    @NotNull(message = "Currency is required")
    private CurrencyEnum currency;

    @Schema(name = "name",
            description = "A name your favorite can call you")
    private String name;

    @Schema(name = "note",
            description = "Message to your favorite creator",
            example = "Say something nicem")
    private String note;
}

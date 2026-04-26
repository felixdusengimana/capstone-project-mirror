package com.pesatone.api.model.dto;

import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.enumeration.PaymentProviderEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class TransactionDto {
    @Schema(name = "creatorUserName",
            description = "PesaTag of creator",
            example = "davido")
    @NotBlank(message = "Creator username is required")
    private String creatorUserName;

    @Schema(name = "donorUserName",
            description = "PesaTag of donor",
            example = "davido")
    private String donorUserName;

    @Schema(name = "amount",
            description = "amount you want to gift",
            example = "1000")
    @NotNull(message = "amount is required")
    @Min(value = 100, message = "amount cannot be less than 100")
    private BigDecimal amount;

    @Schema(name = "currency",
            description = "Currency of gift",
    example = "RWF")
    @NotNull(message = "Currency is required")
    private CurrencyEnum currency;

    @Schema(name = "paymentProvider",
            description = "Payment Provider",
            example = "FLUTTERWAVE")
    @NotNull(message = "Payment Provider is required")
    private PaymentProviderEnum paymentProvider;

    @Schema(name = "name",
            description = "A name your favorite can call you")
    @Max(value = 200, message = "We can only allow 200 characters at the moment")
    private String name;

    @Schema(name = "email",
            description = "Email of supporter")
    private String email;

    @Schema(name = "phoneNumber",
            description = "Phone Number of supporter")
    private String phoneNumber;

    @Schema(name = "note",
            description = "Message to your favorite creator",
            example = "Say something nicem")
    @Max(value = 500, message = "We can only allow 500 characters at the moment")
    private String note;
}

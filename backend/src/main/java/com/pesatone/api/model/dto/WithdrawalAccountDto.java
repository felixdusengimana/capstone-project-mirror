package com.pesatone.api.model.dto;

import com.pesatone.api.model.enumeration.PayoutChannelEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WithdrawalAccountDto {
    @NotNull(message = "Account number required")
    @Schema(name = "accountNumber",
            description = "Account number",
            example = "123424", requiredMode = Schema.RequiredMode.REQUIRED)
    private String accountNumber;

    @Schema(name = "accountName",
            description = "Account name",
            example = "123424", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private String accountName;

    @NotNull(message = "Account type is required")
    @Schema(name = "accountType",
            description = "Withdrawal account type",
            example = "BANK_ACCOUNT", requiredMode = Schema.RequiredMode.REQUIRED)
    private PayoutChannelEnum accountType;

    @Schema(name = "bankCode",
            description = "Bank code",
            example = "ABC", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private String bankCode;
}

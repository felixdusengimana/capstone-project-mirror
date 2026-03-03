package com.pesatone.api.model.dto.flw;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pesatone.api.model.entity.Payout;
import com.pesatone.api.model.entity.WithdrawalAccount;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class FlwPayoutRequestDto {
    @JsonProperty("accountBank")
    @JsonAlias("account_bank")
    private String accountBank = "MPS";

    @JsonProperty("accountNumber")
    @JsonAlias("account_number")
    private String accountNumber;

    private BigDecimal amount;
    private String narration;
    private String currency = "RWF";

    @JsonProperty("beneficiaryName")
    @JsonAlias("beneficiary_name")
    private String beneficiaryName;

    private String reference;

    public FlwPayoutRequestDto(Payout payout, WithdrawalAccount withdrawalAccount){
        setAmount(payout.getAmount());
        setReference(payout.getTransactionReference());
        setBeneficiaryName(StringUtils.defaultIfBlank(withdrawalAccount.getAccountName(),payout.getCreator().getName()));
        setNarration("Payout on "+ new Date());
        setAccountNumber(withdrawalAccount.getAccountNumber());
    }
}

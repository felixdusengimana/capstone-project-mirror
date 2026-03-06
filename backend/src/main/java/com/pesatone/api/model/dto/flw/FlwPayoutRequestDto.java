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
    private String account_bank = "MPS";
    private String account_number;
    private BigDecimal amount;
    private String narration;
    private String currency = "RWF";
    private String beneficiary_name;

    private String reference;

    public FlwPayoutRequestDto(Payout payout, WithdrawalAccount withdrawalAccount){
        setAmount(payout.getAmount());
        setReference(payout.getTransactionReference());
        setBeneficiary_name(StringUtils.defaultIfBlank(withdrawalAccount.getAccountName(),payout.getCreator().getName()));
        setNarration("Payout on "+ new Date());
        setAccount_number(withdrawalAccount.getAccountNumber());
    }
}

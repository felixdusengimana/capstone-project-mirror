package com.pesatone.api.model.dto.flw;

import com.pesatone.api.model.entity.Payout;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

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
    private String callback_url;

    public FlwPayoutRequestDto(Payout payout, String callbackUrl){
        setAmount(payout.getAmount());
        setReference(payout.getTransactionReference());
        setCallback_url(callbackUrl);
    }
}

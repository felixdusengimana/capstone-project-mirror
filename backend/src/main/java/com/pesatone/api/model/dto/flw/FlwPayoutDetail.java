package com.pesatone.api.model.dto.flw;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pesatone.api.model.entity.Payout;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class FlwPayoutDetail {
    private String account_bank = "MPS";
    private String account_number;
    private BigDecimal amount;
    private String narration;
    private String currency = "RWF";

    private String reference;

    private String status;

    private String id;

    public boolean successful(){
        return this.status.equalsIgnoreCase("SUCCESSFUL");
    }
}

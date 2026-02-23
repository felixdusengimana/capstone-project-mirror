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
    @JsonProperty("accountBank")
    @JsonAlias("account_bank")
    private String accountBank = "MPS";

    @JsonProperty("accountNumber")
    @JsonAlias("account_number")
    private String accountNumber;

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

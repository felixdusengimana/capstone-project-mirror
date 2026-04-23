package com.pesatone.api.model.dto.fdi;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FdiRequest {
    private String trxRef;
    private String channelId = "momo-mtn-rw";
    private String accountId;
    private String msisdn;
    private Integer amount;
    private String callback;

    public FdiRequest(String trxRef, String accountId, String msisdn, Integer amount, String callback) {
        this.trxRef = trxRef;
        this.accountId = accountId;
        this.msisdn = msisdn;
        this.amount = amount;
        this.callback = callback;
    }
}

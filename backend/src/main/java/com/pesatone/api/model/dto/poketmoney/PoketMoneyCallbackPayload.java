package com.pesatone.api.model.dto.poketmoney;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PoketMoneyCallbackPayload {
    private String id;
    private Integer amount;
    private String status;
    private String currency;
    private Map<String, String> metadata;
    @JsonProperty("external_id")
    private String externalId;
    @JsonProperty("applied_fees")
    private Integer appliedFees;
    @JsonProperty("final_amount")
    private Integer finalAmount;
}


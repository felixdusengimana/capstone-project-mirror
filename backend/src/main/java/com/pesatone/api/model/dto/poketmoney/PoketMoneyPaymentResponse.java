package com.pesatone.api.model.dto.poketmoney;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PoketMoneyPaymentResponse {
    private String id;
    private String status;
    @JsonProperty("external_id")
    private String externalId;
    private Integer amount;
    private String currency;
    private String message;
}


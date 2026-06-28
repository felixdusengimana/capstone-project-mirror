package com.pesatone.api.model.dto.poketmoney;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PoketMoneyStatusCheckRequest {
    @JsonProperty("external_id")
    private String externalId;
}


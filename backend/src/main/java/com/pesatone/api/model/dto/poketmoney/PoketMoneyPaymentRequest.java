package com.pesatone.api.model.dto.poketmoney;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PoketMoneyPaymentRequest {
    private Integer amount;
    private String msisdn;
    private String currency;
    private Map<String, String> metadata;
    private String external_id;
    private String callback_url;
}


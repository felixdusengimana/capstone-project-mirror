package com.pesatone.api.model.dto.flw;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashMap;

@Getter
@Setter
public class FlwCallBackDto {
    @NotBlank
    private String event;

    private LinkedHashMap data;

    public boolean isPaymentCallback(){
        return this.event.equalsIgnoreCase("charge.completed");
    }

    public boolean isPayoutCallback(){
        return this.event.equalsIgnoreCase("transfer.completed");
    }
}

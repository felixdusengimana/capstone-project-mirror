package com.pesatone.api.model.dto.flw;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FlwCallBackDto<T> {
    @NotBlank
    private String event;

    @NotNull
    @Valid
    private T data;

    public boolean isPaymentCallback(){
        return this.event.equalsIgnoreCase("charge.completed");
    }

    public boolean isPayoutCallback(){
        return this.event.equalsIgnoreCase("transfer.completed");
    }
}

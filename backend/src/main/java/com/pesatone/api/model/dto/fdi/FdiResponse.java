package com.pesatone.api.model.dto.fdi;

import com.pesatone.api.model.enumeration.PaymentStatusEnum;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FdiResponse {
    private String status;
    private FdiData data;

    public boolean successful(){
        return this.data != null && this.data.getState() != null && this.data.getState().equalsIgnoreCase("successful");
    }

    public PaymentStatusEnum getPaymentStatus (){
        return this.successful() ? PaymentStatusEnum.SUCCESSFUL:PaymentStatusEnum.FAILED;
    }
}

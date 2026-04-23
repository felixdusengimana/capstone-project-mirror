package com.pesatone.api.model.dto.fdi;

import java.util.List;

import com.pesatone.api.model.enumeration.PaymentStatusEnum;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FdiResponse {
    private String status;
    private FdiData data;

    public boolean successful() {
        return this.data != null
                && (this.data.getState() != null && this.data.getState().equalsIgnoreCase("successful"))
                || (this.data.getTrxStatus() != null && this.data.getTrxStatus().equalsIgnoreCase("successful"));
    }

    public boolean pending() {
        return this.data != null && (this.data.getState() != null && this.data.getState().equalsIgnoreCase("pending"))
                || (this.data.getTrxStatus() != null && this.data.getTrxStatus().equalsIgnoreCase("pending"));
    }

    public boolean failed() {
        return this.data != null && (this.data.getState() != null && this.data.getState().equalsIgnoreCase("failed"))
                || (this.data.getTrxStatus() != null && this.data.getTrxStatus().equalsIgnoreCase("failed"))
                || List.of("fail", "error").contains(this.status);
    }

    public boolean canProcess(){
        return this.successful() || this.failed();
    }

    public PaymentStatusEnum getPaymentStatus() {
        if (this.successful()) {
            return PaymentStatusEnum.SUCCESSFUL;
        } else if (pending()) {
            return PaymentStatusEnum.PENDING;
        } else {
            return PaymentStatusEnum.FAILED;
        }
    }
}

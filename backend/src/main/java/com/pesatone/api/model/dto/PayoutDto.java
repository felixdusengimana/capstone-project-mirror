package com.pesatone.api.model.dto;

import com.pesatone.api.model.dto.fdi.FdiResponse;
import com.pesatone.api.model.dto.flw.FlwPayoutDetail;
import com.pesatone.api.model.entity.Payout;
import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.enumeration.PaymentProviderEnum;
import com.pesatone.api.model.enumeration.PaymentStatusEnum;
import com.pesatone.api.model.enumeration.PayoutProcessingStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PayoutDto{
    private PaymentProviderEnum paymentProvider;
    private BigDecimal amount;
    private CurrencyEnum currency;
    private PaymentStatusEnum paymentStatus;
    private Date processedAt;

    public PayoutDto(FlwPayoutDetail detail){
        this.paymentProvider = PaymentProviderEnum.FLUTTERWAVE;
        this.amount = detail.getAmount();
        this.currency = CurrencyEnum.RWF;
        this.paymentStatus = PaymentStatusEnum.valueOf(detail.getStatus());
        this.processedAt = new Date();
    }

    public PayoutDto(FdiResponse detail, Payout payout){
        this.paymentProvider = PaymentProviderEnum.FDI;
        this.amount = payout.getAmount();
        this.currency = CurrencyEnum.RWF;
        this.paymentStatus = detail.successful() ? PaymentStatusEnum.SUCCESSFUL: PaymentStatusEnum.FAILED;
        this.processedAt = new Date();
    }

    public boolean isSuccessful(){
        return this.paymentStatus.equals(PaymentStatusEnum.SUCCESSFUL);
    }

    public boolean isFailed(){
        return this.paymentStatus.equals(PaymentStatusEnum.FAILED);
    }

    public boolean isPending(){
        return this.paymentStatus.equals(PaymentStatusEnum.PENDING);
    }

    public boolean canProcessPayout(){
        return this.isSuccessful() || this.isFailed();
    }
}

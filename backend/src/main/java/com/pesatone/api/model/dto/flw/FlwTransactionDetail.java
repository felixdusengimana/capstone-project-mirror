package com.pesatone.api.model.dto.flw;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pesatone.api.model.dto.PaymentDto;
import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.enumeration.PaymentProviderEnum;
import com.pesatone.api.model.enumeration.PaymentStatusEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.time.DateUtils;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class FlwTransactionDetail {
    @NotBlank
    private String id;

    @NotBlank
    private String tx_ref;

    private String flw_ref;

    @NotNull
    private BigDecimal amount;

    @NotBlank
    private String currency;
    private String narration;

    @NotBlank
    private String status;

    private String payment_type;

    private String created_at;

    public boolean successful(){
        return this.status.equalsIgnoreCase("successful");
    }

    public PaymentDto getPaymentDto(){
        Date paymentDate = new Date();
        try {
            paymentDate = DateUtils.parseDate(this.created_at, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
        }catch (Exception ignored){}

        CurrencyEnum curr = CurrencyEnum.valueOf(this.currency.toUpperCase());
        PaymentStatusEnum paymentStatus = this.successful() ? PaymentStatusEnum.SUCCESSFUL:PaymentStatusEnum.FAILED;

        return new PaymentDto(PaymentProviderEnum.FLUTTERWAVE,
                this.payment_type,
                this.amount,
                curr,
                paymentStatus,
                this.flw_ref,
                paymentDate);
    }
}
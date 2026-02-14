package com.pesatone.api.model.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.enumeration.PaymentProviderEnum;
import com.pesatone.api.model.enumeration.PaymentStatusEnum;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.time.DateUtils;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class FlwCallBackDto {
    @NotBlank
    private String event;

    @NotNull
    @Valid
    private FlwCallBackData data;

    public boolean successful(){
        return this.data.getStatus().equalsIgnoreCase("successful");
    }

    public PaymentDto from(){
        Date paymentDate = new Date();
        try {
            paymentDate = DateUtils.parseDate(this.data.getCreatedAt(), "yyyy-MM-dd'T'HH:mm:ss.SSSX");
        }catch (Exception ignored){}

        CurrencyEnum currency = CurrencyEnum.valueOf(this.data.getCurrency().toUpperCase());
        PaymentStatusEnum paymentStatus = this.successful() ? PaymentStatusEnum.SUCCESSFUL:PaymentStatusEnum.FAILED;


        return new PaymentDto(PaymentProviderEnum.FLUTTERWAVE,
                this.data.getPaymentType(),
                this.data.getAmount(),
                currency,
                paymentStatus,
                this.data.getFlwRef(),
                paymentDate);
    }
}

@Getter
@Setter
class FlwCallBackData{
    @NotBlank
    private String id;

    @NotBlank
    @JsonProperty("txRef")
    @JsonAlias("tx_ref")
    private String txRef;

    @JsonProperty("flwRef")
    @JsonAlias("flw_ref")
    private String flwRef;

    @NotNull
    private BigDecimal amount;

    @NotBlank
    private String currency;
    private String narration;

    @NotBlank
    private String status;

    @JsonProperty("paymentType")
    @JsonAlias("payment_type")
    private String paymentType;

    @JsonProperty("createdAt")
    @JsonAlias("created_at")
    private String createdAt;
}
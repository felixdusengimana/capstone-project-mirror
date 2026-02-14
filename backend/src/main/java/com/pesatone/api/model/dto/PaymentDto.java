package com.pesatone.api.model.dto;

import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.enumeration.PaymentProviderEnum;
import com.pesatone.api.model.enumeration.PaymentStatusEnum;

import java.math.BigDecimal;
import java.util.Date;

public record PaymentDto(PaymentProviderEnum paymentProvider,
                         String paymentChannel,
                         BigDecimal amount,
                         CurrencyEnum currency,
                         PaymentStatusEnum paymentStatus,
                         String providerReference,
                         Date paidAt) {
}

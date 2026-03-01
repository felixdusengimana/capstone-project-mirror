package com.pesatone.api.model.search.response;

import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.enumeration.PaymentStatusEnum;
import com.pesatone.api.model.enumeration.PayoutChannelEnum;

import java.math.BigDecimal;
import java.util.Date;

public record PayoutSearchResponse(Long id,
                                   BigDecimal amount,
                                   CurrencyEnum currency,
                                   PayoutChannelEnum paymentChannel,
                                   PaymentStatusEnum paymentStatus,
                                   String transactionReference,
                                   Date createdAt,
                                   Date processedAt,
                                   String creatorUserName,
                                   String creatorName,
                                   String creatorProfileImageUrl) {
}

package com.pesatone.api.model.search.filter;

import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.enumeration.PaymentStatusEnum;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PayoutSearchFilter extends PaginatedSearchFilter{
    @Parameter(name = "paymentStatus",
            description = "Payment status",
            example = "PENDING")
    private PaymentStatusEnum paymentStatus;

    @Parameter(name = "currency",
            description = "Currency",
            example = "RWF")
    private CurrencyEnum currency;

    @Parameter(name = "creatorTag",
            description = "Creator's PesaTag",
            example = "@davido")
    private String creatorTag;
}

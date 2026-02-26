package com.pesatone.api.model.pojo;

import com.pesatone.api.model.enumeration.CurrencyEnum;

import java.math.BigDecimal;

public record WalletPojo(BigDecimal balance,
                         CurrencyEnum currency) {
}

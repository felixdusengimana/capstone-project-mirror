package com.pesatone.api.model.pojo;

import com.pesatone.api.model.enumeration.StatusEnum;

public record BankResponse(Long id,
                           String name,
                           String code,
                           StatusEnum status,
                           String countryName,
                           String countryIsoCode) {
}

package com.pesatone.api.model.pojo;

import com.pesatone.api.model.entity.Country;
import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.enumeration.StatusEnum;

public record CountryResponse(Long id,
                              String name,
                              String isoCode,
                              String countryCode,
                              CurrencyEnum currency,
                              StatusEnum status) {
    public static CountryResponse from(Country country) {
        return new CountryResponse(country.getId(), country.getName(), country.getIsoCode(),
                country.getCountryCode(), country.getCurrency(), country.getStatus());
    }
}

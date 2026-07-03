package com.pesatone.api.model.dto;

import com.pesatone.api.model.enumeration.CurrencyEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CountryDto {
    @NotBlank(message = "Country name is required")
    @Schema(description = "Name of the country", example = "Rwanda")
    private String name;

    @NotBlank(message = "ISO code is required")
    @Schema(description = "Unique ISO code for the country", example = "RWA")
    private String isoCode;

    @Schema(description = "International dialing code", example = "+250")
    private String countryCode;

    @NotNull(message = "Currency is required")
    @Schema(description = "Currency used in the country", example = "RWF")
    private CurrencyEnum currency;
}

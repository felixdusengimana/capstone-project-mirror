package com.pesatone.api.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BankDto {
    @NotBlank(message = "Bank name is required")
    @Schema(description = "Name of the bank", example = "Bank of Kigali")
    private String name;

    @NotBlank(message = "Bank code is required")
    @Schema(description = "Unique code for the bank", example = "BK")
    private String code;

    @NotBlank(message = "Country ISO code is required")
    @Schema(description = "ISO code of the country the bank belongs to", example = "RWA")
    private String countryIsoCode;
}

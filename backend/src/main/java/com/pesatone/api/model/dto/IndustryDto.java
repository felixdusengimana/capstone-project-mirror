package com.pesatone.api.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IndustryDto {
    @NotBlank(message = "Industry name is required")
    @Schema(description = "Name of the industry", example = "Music")
    private String name;

    @NotBlank(message = "Industry code is required")
    @Schema(description = "Unique code for the industry", example = "MUS")
    private String code;
}

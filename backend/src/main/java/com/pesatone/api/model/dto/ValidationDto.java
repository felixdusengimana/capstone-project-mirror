package com.pesatone.api.model.dto;

import com.pesatone.api.model.enumeration.ValidationResourceType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ValidationDto {
    @Schema(name = "value",
            description = "A resource you want to validate",
            example = "value", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "value is required")
    private String value;

    @Schema(name = "resourceType",
            description = "Resource type you want to validate",
            example = "PESA_TAG", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "resourceType is required")
    private ValidationResourceType resourceType;
}

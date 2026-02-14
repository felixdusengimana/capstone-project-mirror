package com.pesatone.api.model.dto.flw;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FlwCallBackDto {
    @NotBlank
    private String event;

    @NotNull
    @Valid
    private FlwTransactionDetail data;
}

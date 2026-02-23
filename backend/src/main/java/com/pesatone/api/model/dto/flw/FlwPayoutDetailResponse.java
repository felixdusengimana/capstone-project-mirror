package com.pesatone.api.model.dto.flw;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FlwPayoutDetailResponse {
    private String status;

    private String message;

    @NotNull
    @Valid
    private FlwPayoutDetail data;
}

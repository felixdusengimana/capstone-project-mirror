package com.pesatone.api.model.dto.flw;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FlwPayoutDetailResponseList {
    private String status;

    private String message;

    @NotNull
    @Valid
    private List<FlwPayoutDetail> data;
}

package com.pesatone.api.model.dto.fdi;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FdiAuthResponse {
    private String status;
    private FdiAuthData data;
}

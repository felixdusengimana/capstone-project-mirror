package com.pesatone.api.model.dto.fdi;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FdiAuthRequest {
    private String appId;
    private String secret;
}

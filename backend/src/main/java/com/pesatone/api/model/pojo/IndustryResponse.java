package com.pesatone.api.model.pojo;

import com.pesatone.api.model.entity.Industry;
import com.pesatone.api.model.enumeration.StatusEnum;

public record IndustryResponse(Long id,
                               String name,
                               String code,
                               StatusEnum status) {
    public static IndustryResponse from(Industry industry) {
        return new IndustryResponse(industry.getId(), industry.getName(),
                industry.getCode(), industry.getStatus());
    }
}

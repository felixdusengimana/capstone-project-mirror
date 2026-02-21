package com.pesatone.api.service;

import com.pesatone.api.model.dto.PayoutRequestDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.Payout;

public interface PayoutService {
    Payout initiatePayout(AppUser creator, PayoutRequestDto dto);
}

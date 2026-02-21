package com.pesatone.api.service;

import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.enumeration.OtpTypeEnum;

public interface OtpService {
    void sendOtp(AppUser recipient, OtpTypeEnum type);

    boolean verifyOtp(AppUser recipient, OtpTypeEnum type, String otp);
}

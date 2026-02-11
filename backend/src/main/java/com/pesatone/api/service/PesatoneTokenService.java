package com.pesatone.api.service;

import com.pesatone.api.model.entity.AppUser;

public interface PesatoneTokenService {
    String getLoginToken(AppUser user);
    String getPasswordResetToken(AppUser user);
    Long getUserIdFromPasswordResetToken(String token);
}

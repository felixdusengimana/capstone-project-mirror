package com.pesatone.api.service;

import com.pesatone.api.model.dto.SignUpDto;
import com.pesatone.api.model.entity.AppUser;

public interface UserService {
    AppUser signUp(SignUpDto dto);
}

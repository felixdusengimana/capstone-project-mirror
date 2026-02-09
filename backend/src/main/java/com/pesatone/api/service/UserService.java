package com.pesatone.api.service;

import com.pesatone.api.model.dto.SignUpDto;
import com.pesatone.api.model.dto.UserDetailDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.enumeration.RoleEnum;

public interface UserService {
    AppUser signUp(SignUpDto dto, RoleEnum role);

    AppUser updateUserDetails(AppUser user, UserDetailDto dto);

    void resetPassword(Long userId, String password);
}

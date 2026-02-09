package com.pesatone.api.service.impl;

import com.pesatone.api.model.dto.SignUpDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.enumeration.StatusEnum;
import com.pesatone.api.repository.AppUserRepository;
import com.pesatone.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final AppUserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public AppUser signUp(SignUpDto dto) {
        AppUser user = new AppUser();
        user.setEmail(dto.getEmail().toLowerCase());
        user.setName(dto.getName());
        user.setPhoneNumber("");
        user.setProfileImageUrl("");
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setStatus(StatusEnum.ACTIVE);

        return userRepository.save(user);
    }
}

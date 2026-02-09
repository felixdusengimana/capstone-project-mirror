package com.pesatone.api.service.impl;

import com.pesatone.api.exception.PesatoneNotFoundException;
import com.pesatone.api.model.dto.SignUpDto;
import com.pesatone.api.model.dto.UserDetailDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.enumeration.RoleEnum;
import com.pesatone.api.model.enumeration.StatusEnum;
import com.pesatone.api.repository.AppUserRepository;
import com.pesatone.api.repository.CountryRepository;
import com.pesatone.api.repository.IndustryRepository;
import com.pesatone.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CountryRepository countryRepository;
    private final IndustryRepository industryRepository;

    @Transactional
    @Override
    public AppUser signUp(SignUpDto dto, RoleEnum role) {
        AppUser user = new AppUser();
        user.setEmail(dto.getEmail().toLowerCase());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setStatus(StatusEnum.ACTIVE);
        user.setRole(role);
        return userRepository.save(user);
    }

    @Transactional
    @Override
    public AppUser updateUserDetails(AppUser user, UserDetailDto dto) {
        if(StringUtils.isNotBlank(dto.getUsername())) user.setUsername(dto.getUsername().toLowerCase());
        if(StringUtils.isNotBlank(dto.getName())) user.setName(dto.getName());
        if(StringUtils.isNotBlank(dto.getPhoneNumber())) user.setPhoneNumber(dto.getPhoneNumber());
        if(StringUtils.isNotBlank(dto.getBio())) user.setBio(dto.getBio());

        if(StringUtils.isNotBlank(dto.getCountryCode())) {
            countryRepository.findActiveByCode(dto.getCountryCode())
                            .ifPresent(user::setCountry);
        }
        if(StringUtils.isNotBlank(dto.getIndustryCode())) {
            industryRepository.findActiveByCode(dto.getIndustryCode())
                    .ifPresent(user::setIndustry);
        }
//        if(!dto.getSocialLinks().isEmpty()) {
//            try {
//               user.setSocialLinks(
//                       objectMapper.writeValueAsString(dto.getSocialLinks())
//               );
//            }catch (Exception ignored){}
//        }

        userRepository.save(user);
        return user;
    }

    @Transactional
    @Override
    public void resetPassword(Long userId, String password) {
       AppUser user = userRepository.findActiveById(userId)
                .orElseThrow(()-> new PesatoneNotFoundException("User not found"));

       user.setPassword(passwordEncoder.encode(password));
       userRepository.save(user);
    }
}

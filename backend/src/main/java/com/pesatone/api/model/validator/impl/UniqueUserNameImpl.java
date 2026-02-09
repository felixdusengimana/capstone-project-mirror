package com.pesatone.api.model.validator.impl;

import com.pesatone.api.configuration.auth.RequestPrincipal;
import com.pesatone.api.model.validator.UniqueUserEmail;
import com.pesatone.api.model.validator.UniqueUserName;
import com.pesatone.api.repository.AppUserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.inject.Named;

/**
 * Copyright (c) 2026. Pesatone. All rights reserved
 *
 * @author phelixdusengimana@gmail.com
 * Created On   March, 2026
 **/

@Component
@RequiredArgsConstructor
public class UniqueUserNameImpl implements ConstraintValidator<UniqueUserName, String> {
    private final AppUserRepository userRepository;
    private final RequestPrincipal principal;

    @Override
    public void initialize(UniqueUserName userName) {
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null) {
            return true;
        }
        return (principal != null
                && principal.getLoggedInUser() != null
                && principal.getLoggedInUser().getUsername().equalsIgnoreCase(value.trim()))
                || userRepository.findByUserName(value.trim()).isEmpty();
    }
}

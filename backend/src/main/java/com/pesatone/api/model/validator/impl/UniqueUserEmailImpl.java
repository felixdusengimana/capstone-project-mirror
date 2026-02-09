package com.pesatone.api.model.validator.impl;

import com.pesatone.api.model.validator.UniqueUserEmail;
import com.pesatone.api.repository.AppUserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import javax.inject.Named;

/**
 * Copyright (c) 2026. Pesatone. All rights reserved
 *
 * @author phelixdusengimana@gmail.com
 * Created On   March, 2026
 **/

@Named
public class UniqueUserEmailImpl implements ConstraintValidator<UniqueUserEmail, String> {
    @Autowired
    private AppUserRepository userRepository;

    @Override
    public void initialize(UniqueUserEmail email) {}

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null) {
            return true;
        }
        return userRepository.findByEmail(value.trim()).isEmpty();
    }
}

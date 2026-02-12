package com.pesatone.api.model.validator.impl;

import com.pesatone.api.model.validator.ValidPhoneNumber;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
public class ValidPhoneNumberImpl implements ConstraintValidator<ValidPhoneNumber, String> {

    @Override
    public void initialize(ValidPhoneNumber phoneNumber) {}

    @Override
    public boolean isValid(String phoneInput, ConstraintValidatorContext constraintValidatorContext) {
        if (phoneInput == null) {
            return true;
        }

        String phoneNumber = phoneInput.replaceAll("[-() ]", "");
        Pattern phoneNumberPatten = Pattern.compile("^(\\(|\\+|[0-9])[0-9 \\+\\(\\)\\-]{7,13}$", Pattern.CASE_INSENSITIVE);

        return phoneNumberPatten.matcher(phoneNumber).find();

    }
}

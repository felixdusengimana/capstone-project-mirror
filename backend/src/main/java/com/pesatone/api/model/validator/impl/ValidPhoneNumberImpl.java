package com.pesatone.api.model.validator.impl;

import com.pesatone.api.model.validator.ValidPhoneNumber;
import org.springframework.stereotype.Component;

import jakarta.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

@Component
public class ValidPhoneNumberImpl implements ValidPhoneNumber.Validator {

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

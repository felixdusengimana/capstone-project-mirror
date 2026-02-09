package com.pesatone.api.model.validator.impl;

import com.pesatone.api.model.validator.ValidPassword;
import org.springframework.stereotype.Service;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

@Service
public class ValidPasswordImpl implements ConstraintValidator<ValidPassword, String> {

    @Override
    public void initialize(ValidPassword password) {}

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        if (s == null) {
            return true;
        }

//        Pattern specialCharPatten = Pattern.compile("[^a-z0-9 ]", Pattern.CASE_INSENSITIVE);
        Pattern UpperCasePatten = Pattern.compile("[A-Z ]");
        Pattern lowerCasePatten = Pattern.compile("[a-z ]");
        Pattern digitCasePatten = Pattern.compile("[0-9 ]");

        return
//                specialCharPatten.matcher(s).find() &&
                UpperCasePatten.matcher(s).find() &&
                lowerCasePatten.matcher(s).find() &&
                digitCasePatten.matcher(s).find() &&
                s.length() >= 8 &&
                s.length() < 64;

    }
}

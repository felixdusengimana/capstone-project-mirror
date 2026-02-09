/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.pesatone.api.model.validator;

import com.pesatone.api.model.validator.impl.UniqueUserEmailImpl;
import com.pesatone.api.model.validator.impl.UniqueUserNameImpl;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

/**
 * Copyright (c) 2026. Pesatone. All rights reserved
 *
 * @author phelixdusengimana@gmail.com
 * Created On   March, 2026
 **/

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.PARAMETER, ElementType.METHOD, ElementType.TYPE_USE})
@Constraint(validatedBy = {UniqueUserNameImpl.class})
public @interface UniqueUserName {

    String message() default "Username already exists";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    String value() default "";
}

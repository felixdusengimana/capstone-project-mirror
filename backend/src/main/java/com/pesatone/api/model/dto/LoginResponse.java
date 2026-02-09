package com.pesatone.api.model.dto;

import com.pesatone.api.configuration.auth.AppPrincipal;
import com.pesatone.api.model.entity.AppUser;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginResponse extends AppPrincipal {
    private String token;
    public LoginResponse(AppUser appUser) {
        super(appUser);
    }
}

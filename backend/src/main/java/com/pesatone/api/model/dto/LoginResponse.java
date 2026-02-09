package com.pesatone.api.model.dto;

import com.pesatone.api.configuration.auth.AppPrincipal;
import com.pesatone.api.model.entity.AppUser;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginResponse {
    private String email;
    private String token;
    private String tokenType;
    private Integer expiresIn;
    public LoginResponse(AppUser appUser,String token, Integer expiresIn) {
        setEmail(appUser.getEmail());
        setToken("Bearer");
        setToken(token);
        setExpiresIn(expiresIn);
    }
}

package com.pesatone.api.configuration.auth;

import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.enumeration.RoleEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RequestPrincipalImpl implements RequestPrincipal {

    @Override
    public AppUser getLoggedInUser() {
        if(this.getAuthUser() != null)
            return this.getAuthUser().getUser();
        return null;
    }

    @Override
    public boolean isCreator() {
        if(this.getLoggedInUser() != null)
            return this.getLoggedInUser().getRole().equals(RoleEnum.CREATOR);
        return false;
    }

    @Override
    public boolean isAdmin() {
        if(this.getLoggedInUser() != null)
            return this.getLoggedInUser().getRole().equals(RoleEnum.ADMIN);
        return false;
    }

    @Override
    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    @Override
    public AuthUser getAuthUser() {
        if(this.getAuthentication() != null)
            return (AuthUser) this.getAuthentication().getDetails();
        return null;
    }

}
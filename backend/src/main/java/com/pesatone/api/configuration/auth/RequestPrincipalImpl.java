package com.pesatone.api.configuration.auth;

import com.pesatone.api.model.entity.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RequestPrincipalImpl implements RequestPrincipal {

    @Override
    public AppUser getLoggedInUser() {
//        if(this.getPrincipal() != null && this.getPrincipal().getUserId() != null)
        return null;
    }

    @Override
    public boolean isAdmin() {
        return true;
    }

    @Override
    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    @Override
    public AppPrincipal getPrincipal() {
        if(this.getAuthentication() != null)
            return (AppPrincipal) this.getAuthentication().getDetails();
        return null;
    }

}
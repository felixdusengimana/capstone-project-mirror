package com.pesatone.api.configuration.auth;

import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.enumeration.StatusEnum;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class AuthUser implements UserDetails {
    private static final long serialVersionUID = -6306703375245498562L;

    //Custom implementation of user details
    //Overrides all required methods that are needed in spring security
    private final AppUser user;

    public AuthUser(AppUser user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptySet();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.user.getStatus().equals(StatusEnum.ACTIVE);
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.user.getStatus().equals(StatusEnum.ACTIVE);
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.user.getStatus().equals(StatusEnum.ACTIVE);
    }

    @Override
    public boolean isEnabled() {
        return this.user.getStatus().equals(StatusEnum.ACTIVE);
    }

    public AppUser getUser() {
        return user;
    }

}

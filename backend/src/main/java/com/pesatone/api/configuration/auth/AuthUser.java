package com.pesatone.api.configuration.auth;

import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.enumeration.RoleEnum;
import com.pesatone.api.model.enumeration.StatusEnum;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

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
        RoleEnum role = this.user.getRole();
        //Add the permissions to authorities
        Set<GrantedAuthority> authorities = role.getPermissions()
                        .stream().map(rp -> new SimpleGrantedAuthority(rp.name()))
                        .collect(Collectors.toSet());

        //Add the role to authorities
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role.name()));

        return authorities;
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

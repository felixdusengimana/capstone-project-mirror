package com.pesatone.api.configuration.auth;

import com.pesatone.api.model.enumeration.PermissionEnum;
import com.pesatone.api.model.enumeration.RoleEnum;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component("accessRule")
public class AccessRule {

    public boolean hasPermission(PermissionEnum... permissions){
        // loop over each submitted permissions and validate the user has at least one
        Collection<? extends GrantedAuthority> userAuthorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        for( PermissionEnum permission : permissions){
            if( userAuthorities.contains( new SimpleGrantedAuthority(permission.name())))
                return true;
        }
        return false;
    }

    public boolean hasRole(RoleEnum... roles){
        // loop over each submitted role and validate the user has at least one
        Collection<? extends GrantedAuthority> userAuthorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        for( RoleEnum role : roles){
            if( userAuthorities.contains( new SimpleGrantedAuthority(role.getRoleName())))
                return true;
        }
        return false;
    }
}
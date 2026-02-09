package com.pesatone.api.configuration.auth;

import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthUserDetailService implements UserDetailsService {
    private final AppUserRepository appUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        // If no username (email) is provided
        if (StringUtils.isBlank(username))
            throw new UsernameNotFoundException(username);

        AppUser user = this.appUserRepository.findActiveByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));

        return new AuthUser(user);
    }

}

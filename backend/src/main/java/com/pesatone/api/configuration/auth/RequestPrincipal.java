package com.pesatone.api.configuration.auth;

import com.pesatone.api.model.entity.AppUser;
import org.springframework.security.core.Authentication;

/**
 * Copyright (c) 2026. Pesatone. All rights reserved
 *
 * @author phelixdusengimana@gmail.com
 * Created On   March, 2026
 **/

public interface RequestPrincipal {
    Authentication getAuthentication();

    AppPrincipal getPrincipal();

    AppUser getLoggedInUser();

    boolean isAdmin();
}


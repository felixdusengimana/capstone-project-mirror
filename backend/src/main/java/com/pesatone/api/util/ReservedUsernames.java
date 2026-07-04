package com.pesatone.api.util;

import java.util.Set;

/**
 * Usernames (pesatags) that may not be claimed by users.
 * Creator profiles are served at the root path (/{username}), so any username matching a real
 * route would be shadowed by that page — hence app routes are reserved alongside brand/impersonation terms.
 */
public final class ReservedUsernames {

    private ReservedUsernames() {
    }

    private static final Set<String> RESERVED = Set.of(
            // app routes
            "login", "signup", "sign-up", "join", "forgot-password", "dashboard", "payouts",
            "settings", "supporters", "pay", "resolve", "terms-of-use", "privacy-policy",
            "proxy-backend", "home", "explore", "search", "about", "help", "api",
            // impersonation / authority
            "admin", "administrator", "support", "helpdesk", "staff", "team", "mod", "moderator",
            "official", "root", "system", "security", "billing", "payments", "noreply", "no-reply",
            "info", "contact",
            // brand
            "pesatone", "pesa",
            // infra / abuse-bait
            "www", "mail", "ftp", "static", "assets", "cdn", "webhook", "callback", "oauth",
            "auth", "null", "undefined", "test"
    );

    public static boolean isReserved(String username) {
        return username != null && RESERVED.contains(username.trim().toLowerCase());
    }
}

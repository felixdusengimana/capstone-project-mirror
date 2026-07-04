package com.pesatone.api.util;

import java.util.Set;
import java.util.stream.Collectors;

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
            "proxy-backend", "home", "explore", "search", "about", "help", "api", "new",
            "notifications", "notifications-settings", "notifications-preferences",

            // impersonation / authority
            "admin", "administrator", "support", "helpdesk", "staff", "team", "mod", "moderator",
            "official", "root", "system", "security", "billing", "payments", "noreply", "no-reply",
            "info", "contact", "terms", "policy", "legal", "privacy", "cookie", "cookies",
            "disclaimer", "disclaimers", "disclaimer-policy", "disclaimer-policies",
            "agreement", "agreements", "agreement-policy", "agreement-policies",
            "tos", "tos-policy", "tos-policies",
            "documentation", "docs", "documentation-policy", "documentation-policies",
            "faq", "faqs", "faq-policy", "faq-policies",
            "status", "status-page", "status-pages",
            "api-docs", "api-documentation", "api-documentation-policy", "api-documentation-policies",
            // brand
            "pesatone", "pesa",
            // infra / abuse-bait
            "www", "mail", "ftp", "static", "assets", "cdn", "webhook", "callback", "oauth",
            "auth", "null", "undefined", "test"
    );

    // Canonical form (separators stripped) so "sign-up", "signup", "sign_up" and "sign.up" all match.
    // Usernames can't contain '-', but a user could try "proxybackend" / "proxy_backend" to mimic "proxy-backend".
    private static final Set<String> RESERVED_CANONICAL = RESERVED.stream()
            .map(ReservedUsernames::canonical)
            .collect(Collectors.toUnmodifiableSet());

    public static boolean isReserved(String username) {
        if (username == null) {
            return false;
        }
        String canonical = canonical(username);
        return !canonical.isEmpty() && RESERVED_CANONICAL.contains(canonical);
    }

    private static String canonical(String value) {
        return value.trim().toLowerCase().replaceAll("[-._]", "");
    }
}

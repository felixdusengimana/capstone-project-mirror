package com.pesatone.api.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ReservedUsernamesTest {

    @Test
    void blocksReservedTags() {
        assertTrue(ReservedUsernames.isReserved("admin"));
        assertTrue(ReservedUsernames.isReserved("login"));
        assertTrue(ReservedUsernames.isReserved("pesatone"));
        assertTrue(ReservedUsernames.isReserved("support"));
    }

    @Test
    void isCaseAndWhitespaceInsensitive() {
        assertTrue(ReservedUsernames.isReserved("ADMIN"));
        assertTrue(ReservedUsernames.isReserved("  Login  "));
    }

    @Test
    void blocksSeparatorVariantsOfReservedRoutes() {
        // usernames can't contain '-', but these de-separated forms must still be blocked
        assertTrue(ReservedUsernames.isReserved("proxybackend"));
        assertTrue(ReservedUsernames.isReserved("proxy_backend"));
        assertTrue(ReservedUsernames.isReserved("proxy.backend"));
        assertTrue(ReservedUsernames.isReserved("signup"));
        assertTrue(ReservedUsernames.isReserved("sign_up"));
        assertTrue(ReservedUsernames.isReserved("no_reply"));
    }

    @Test
    void allowsNormalTags() {
        assertFalse(ReservedUsernames.isReserved("serge"));
        assertFalse(ReservedUsernames.isReserved("john.doe"));
        assertFalse(ReservedUsernames.isReserved("_mutabazi"));
        // full-string match only — these merely contain a reserved word, not equal it
        assertFalse(ReservedUsernames.isReserved("signupnow"));
        assertFalse(ReservedUsernames.isReserved("tosser"));
    }

    @Test
    void handlesNullAndBlank() {
        assertFalse(ReservedUsernames.isReserved(null));
        assertFalse(ReservedUsernames.isReserved("   "));
    }
}

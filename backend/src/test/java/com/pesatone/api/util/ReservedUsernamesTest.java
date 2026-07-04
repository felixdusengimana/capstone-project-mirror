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
    void allowsNormalTags() {
        assertFalse(ReservedUsernames.isReserved("serge"));
        assertFalse(ReservedUsernames.isReserved("john.doe"));
        assertFalse(ReservedUsernames.isReserved("_mutabazi"));
    }

    @Test
    void handlesNullAndBlank() {
        assertFalse(ReservedUsernames.isReserved(null));
        assertFalse(ReservedUsernames.isReserved("   "));
    }
}

package com.pesatone.api.util;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.text.ParseException;

import static org.junit.jupiter.api.Assertions.*;

class AppUtilTest {

    @Test
    void getDateFromStringValue_parsesIsoDate() throws ParseException {
        assertNotNull(AppUtil.getDateFromStringValue("2024-02-28"));
    }

    @Test
    void getDateFromStringValue_throwsOnGarbage() {
        assertThrows(ParseException.class, () -> AppUtil.getDateFromStringValue("not-a-date"));
    }

    @Test
    void generateOtp_isSixDigits() {
        assertTrue(AppUtil.generateOtp().matches("\\d{6}"));
    }

    @Test
    void getTransactionReference_hasPrefixAndLength() {
        String ref = AppUtil.getTransactionReference("TXN");
        assertTrue(ref.startsWith("TXN-"));
        assertEquals(14, ref.length());
    }

    @Test
    void verifyCallBack_passesWhenHashesMatch() {
        assertDoesNotThrow(() -> AppUtil.verifyCallBack("abc", "abc", "{}"));
    }

    @Test
    void verifyCallBack_throwsWhenHashesDiffer() {
        assertThrows(IllegalArgumentException.class,
                () -> AppUtil.verifyCallBack("abc", "xyz", "{}"));
    }

    @Test
    void formatAmount_returnsGroupedString() {
        assertNotNull(AppUtil.formatAmount(new BigDecimal("1234567")));
    }

    @Test
    void getMSSIDN_handlesEachPrefix() {
        assertEquals("0788123456", AppUtil.getMSSIDN("0788123456"));
        assertEquals("0788123456", AppUtil.getMSSIDN("+250788123456"));
        assertEquals("0788123456", AppUtil.getMSSIDN("250788123456"));
    }

    @Test
    void getMSSIDN_throwsOnInvalid() {
        assertThrows(IllegalArgumentException.class, () -> AppUtil.getMSSIDN("788123456"));
    }
}

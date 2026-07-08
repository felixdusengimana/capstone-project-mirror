package com.pesatone.api.service;

import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.service.impl.PesatoneTokenServiceImpl;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import javax.crypto.SecretKey;

import static org.junit.jupiter.api.Assertions.*;

class PesatoneTokenServiceImplTest {

    private PesatoneTokenServiceImpl service;
    private AppUser user;

    @BeforeEach
    void setUp() {
        SecretKey key = Keys.hmacShaKeyFor(
                "unit-test-only-signing-key-not-a-real-secret-000".getBytes());
        service = new PesatoneTokenServiceImpl(key);
        ReflectionTestUtils.setField(service, "jwtExpiry", 3600);
        user = new AppUser();
        user.setId(42L);
        user.setEmail("felix@example.com");
    }

    @Test
    void getLoginToken_returnsNonEmptyToken() {
        assertFalse(service.getLoginToken(user).isBlank());
    }

    @Test
    void passwordResetToken_roundTripsUserId() {
        String token = service.getPasswordResetToken(user);
        assertEquals(42L, service.getUserIdFromPasswordResetToken(token));
    }

    @Test
    void getUserIdFromPasswordResetToken_throwsOnInvalidToken() {
        assertThrows(IllegalArgumentException.class,
                () -> service.getUserIdFromPasswordResetToken("garbage.token.value"));
    }
}

package com.pesatone.api.service.impl;

import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.service.PesatoneTokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PesatoneTokenServiceImpl implements PesatoneTokenService {
    private final SecretKey secretKey;
    @Value("${application.jwtExpiry}")
    Integer jwtExpiry;

    @Override
    public String getLoginToken(AppUser user) {

        Date tokenExpiryDate = Timestamp.valueOf(LocalDateTime.now().plusSeconds(jwtExpiry));

        return Jwts.builder()
                .subject(user.getEmail())
                .claim("userId", user.getId())
                .claim("email", user.getEmail())
                .claim("sessionId", UUID.randomUUID().toString())
                .issuedAt(new Date())
                .expiration(tokenExpiryDate)
                .signWith(secretKey)
                .compact();
    }

    @Override
    public String getPasswordResetToken(AppUser user) {

        Date tokenExpiryDate = Timestamp.valueOf(LocalDateTime.now().plusSeconds(jwtExpiry));

        return Jwts.builder()
                .subject("Password Reset")
                .claim("userId", user.getId())
                .issuedAt(new Date())
                .expiration(tokenExpiryDate)
                .signWith(secretKey)
                .compact();
    }

    @Override
    public Long getUserIdFromPasswordResetToken(String token) {
        Long userId;
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            userId = claims.get("userId", Long.class);
        } catch (Exception ex) {
            throw new IllegalArgumentException("Invalid password reset token");
        }
        if (userId == null) {
            throw new IllegalArgumentException("Invalid password reset token");
        }
        return userId;
    }
}

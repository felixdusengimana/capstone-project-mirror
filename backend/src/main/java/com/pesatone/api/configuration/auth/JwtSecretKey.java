package com.pesatone.api.configuration.auth;

import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;

@Configuration
public class JwtSecretKey {
    @Value("${application.jwtKey}")
    private String jwtKey;

    @Bean
    public SecretKey secretKey() {
        return Keys.hmacShaKeyFor(jwtKey.getBytes());
    }
}

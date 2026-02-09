package com.pesatone.api.configuration.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pesatone.api.model.dto.ApiResponseObject;
import com.pesatone.api.model.dto.LoginRequest;
import com.pesatone.api.model.dto.LoginResponse;
import com.pesatone.api.model.entity.AppUser;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

public class UsernameAndPasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final SecretKey secretKey;
    private final ObjectMapper objectMapper;

    public UsernameAndPasswordAuthenticationFilter(AuthenticationManager authenticationManager,
                                                   SecretKey secretKey,
                                                   ObjectMapper objectMapper) {
        this.authenticationManager = authenticationManager;
        this.secretKey = secretKey;
        this.objectMapper = objectMapper;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {

        try {
            LoginRequest authenticationRequest = new ObjectMapper()
                    .readValue(request.getInputStream(), LoginRequest.class);

            if(StringUtils.isBlank(authenticationRequest.getPassword())
            || StringUtils.isBlank(authenticationRequest.getUsername())){
                throw new IllegalArgumentException("Invalid authentication request");
            }

            request.getSession().setAttribute("LoginRequest", authenticationRequest);

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(),
                    authenticationRequest.getPassword()
            );

            return authenticationManager.authenticate(authentication);

        } catch (IOException | AssertionError e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException {
        ApiResponseObject<?> apiResponseObject = new ApiResponseObject<>("Unauthorized",false);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(objectMapper.writeValueAsString(apiResponseObject));
    }


    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException {
            AuthUser user = ((AuthUser) authResult.getPrincipal());
            AppUser appUser = user.getUser();

            Date tokenExpiryDate = Timestamp.valueOf(LocalDateTime.now().plusHours(1));

            String token = Jwts.builder()
                    .subject(authResult.getName())
                    .claim("userId", appUser.getId())
                    .claim("sessionId", UUID.randomUUID().toString())
                    .issuedAt(new Date())
                    .expiration(tokenExpiryDate)
                    .signWith(secretKey)
                    .compact();

            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);

            LoginResponse loginResponse = new LoginResponse(appUser);
            loginResponse.setToken(token);

            response.getWriter().write(objectMapper.writeValueAsString(loginResponse));
            response.getWriter().flush();
            removeSessionObject(request);
    }

    private void removeSessionObject(HttpServletRequest request){
        request.getSession().removeAttribute("LoginRequest");
    }

}

package com.pesatone.api.configuration.auth;

import com.pesatone.api.exception.PesatoneAuthenticationException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private SecretKey secretKey;
    @Autowired
    private AuthUserDetailService userDetailService;
    private static final String TOKEN_PREFIX = "Bearer ";

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader("Authorization");
        if(authorizationHeader == null || !authorizationHeader.startsWith(TOKEN_PREFIX)){
            filterChain.doFilter(request,response);
            return;
        }

        if (StringUtils.startsWith(authorizationHeader, TOKEN_PREFIX)) {
            try {
                String token = authorizationHeader.substring(7);

                Claims claims = Jwts.parser()
                        .verifyWith(secretKey)
                        .build()
                        .parseSignedClaims(token)
                        .getPayload();

                String email = claims.get("email", String.class);

                AuthUser userDetails = userDetailService.loadUserByUsername(email);

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        email,
                        null,
                        userDetails.getAuthorities()
                );

                authentication.setDetails(userDetails);

                SecurityContextHolder.getContext().setAuthentication(authentication);

                filterChain.doFilter(request, response);
            } catch (Exception ex) {
                throwAuthException(ex.getMessage());
            }
        } else {
            throwAuthException("Unable to authenticate user");
        }
    }

    private void throwAuthException(String message) {
        throw new PesatoneAuthenticationException(message);
    }
}

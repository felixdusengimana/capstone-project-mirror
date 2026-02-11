package com.pesatone.api.controller;

import com.pesatone.api.configuration.auth.AuthUser;
import com.pesatone.api.model.dto.*;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.enumeration.RoleEnum;
import com.pesatone.api.repository.AppUserRepository;
import com.pesatone.api.service.PesatoneTokenService;
import com.pesatone.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

/**
 * Copyright (c) 2026. Pesatone. All rights reserved
 *
 * @author phelixdusengimana@gmail.com
 **/

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
@Tag(name="1. Authentication")
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final PesatoneTokenService tokenService;
    private final AppUserRepository userRepository;
    @Value("${application.jwtExpiry}")
    Integer jwtExpiry;

    @Operation(summary = "Signup", description = "Signup")
    @PostMapping("signup")
    public ResponseEntity<ApiResponseObject<AppUser>> signUp(@RequestBody @Valid SignUpDto dto,
                                                                BindingResult bindingResult) throws BindException {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        AppUser user = userService.signUp(dto, RoleEnum.CREATOR);
        return ResponseEntity.ok(new ApiResponseObject<>("User signup successful", true, user));
    }

    @Operation(summary = "Login", description = "Login")
    @PostMapping("login")
    public ResponseEntity<ApiResponseObject<LoginResponse>> login(@RequestBody @Valid LoginRequest dto,
                                                             BindingResult bindingResult) throws BindException {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        Authentication authentication =  authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                dto.getEmail(),
                dto.getPassword()
        ));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        AppUser user = ((AuthUser) authentication.getPrincipal()).getUser();
        LoginResponse loginResponse = new LoginResponse(user,tokenService.getLoginToken(user),jwtExpiry);
        return ResponseEntity.ok(new ApiResponseObject<>("Login successful", true, loginResponse));
    }

    @Operation(summary = "Initiate Password Reset", description = "Initiate Password Reset")
    @PostMapping("/password-reset/initiate")
    public ResponseEntity<ApiResponseObject<Object>> initiatePasswordReset(@RequestBody @Valid InitiateResetPasswordDto dto) {
        userRepository.findByEmail(dto.getEmail())
                .ifPresent(userService::initiatePasswordReset);
        return ResponseEntity.ok(new ApiResponseObject<>("Password reset initiated successfully", true, null));
    }

    @Operation(summary = "Reset Password", description = "Reset your Password")
    @PostMapping("/password-reset")
    public ResponseEntity<ApiResponseObject<Object>> resetPassword(@RequestBody @Valid ResetPasswordDto dto) {
        userService.resetPassword(tokenService.getUserIdFromPasswordResetToken(dto.getToken()), dto.getPassword());
        return ResponseEntity.ok(new ApiResponseObject<>("Password changed successfully", true, null));
    }

    @Operation(summary = "Logout user", description = "Logout currently logged in user")
    @PostMapping("/logout")
    public ResponseEntity<ApiResponseObject<?>> logout() {
        SecurityContextHolder.clearContext();
        //TODO use the blacklist method for tokens
        return ResponseEntity.ok(new ApiResponseObject<>("User logged out successfully", true));
    }
}

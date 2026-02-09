package com.pesatone.api.controller;

import com.pesatone.api.configuration.auth.RequestPrincipal;
import com.pesatone.api.model.dto.ApiResponseObject;
import com.pesatone.api.model.dto.SignUpDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

/**
 * Copyright (c) 2026. Pesatone. All rights reserved
 *
 * @author phelixdusengimana@gmail.com
 **/

@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
public class AuthenticationController {
    private final RequestPrincipal requestPrincipal;
    private final UserService userService;

    @Operation(summary = "Create Invite", description = "Create an Invite")
    @PostMapping("signup")
    public ResponseEntity<ApiResponseObject<AppUser>> signUp(@RequestBody @Valid SignUpDto dto,
                                                                BindingResult bindingResult) throws BindException {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        AppUser user = userService.signUp(dto);

        return ResponseEntity.ok(new ApiResponseObject<>("User signup successful", true, user));
    }

    @Operation(summary = "Get User Profile", description = "Get LoggedIn User Profile")
    @GetMapping("/profile")
    public ResponseEntity<ApiResponseObject<Object>> getLoggedInUser() {
        AppUser user = requestPrincipal.getLoggedInUser();
        return ResponseEntity.ok(new ApiResponseObject<Object>("User profile retrieved successfully",true, user));
    }


    @Operation(summary = "Logout user", description = "Logout a User")
    @PostMapping("/logout")
    public ResponseEntity<ApiResponseObject<?>> logout(@RequestParam(name ="sessionId", required = false) String sessionId) {
        return ResponseEntity.ok(new ApiResponseObject<>("User logged out successfully", true));
    }

}

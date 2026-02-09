package com.pesatone.api.controller;

import com.pesatone.api.configuration.auth.RequestPrincipal;
import com.pesatone.api.model.dto.ApiResponseObject;
import com.querydsl.core.QueryResults;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.UUID;

/**
 * Copyright (c) 2026. Pesatone. All rights reserved
 *
 * @author phelixdusengimana@gmail.com
 **/

@RequiredArgsConstructor
@Controller
@RequestMapping("users")
@Slf4j
public class UserController {
    private final RequestPrincipal principal;

    @Operation(summary = "Get User", description = "Get an Existing User")
    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority(T(com.pesatone.api.model.enumeration.PermissionTypeConstant).USER_READ)")
    public ResponseEntity<ApiResponseObject<Object>> getUser(@PathVariable(name ="id") UUID id) {
        return ResponseEntity.ok(new ApiResponseObject<>("",true, null));
    }

    @Operation(summary = "List Users", description = "Search for Users")
    @GetMapping
    @PreAuthorize("hasAnyAuthority(T(com.pesatone.api.model.enumeration.PermissionTypeConstant).USER_READ)")
    public ResponseEntity<ApiResponseObject<QueryResults<Object>>> searchUsers( @Valid Object filter) {
        return ResponseEntity.ok(new ApiResponseObject<>("Users retrieved successfully",
                true,null));
    }


    @Operation(summary = "Change Password", description = "Change a Password")
    @PutMapping("/changePassword")
    public ResponseEntity<ApiResponseObject<Object>> changePassword(@RequestBody @Valid Object changePasswordDto) {
        return ResponseEntity.ok(new ApiResponseObject<>("Password changed successfully", true, null));
    }


    @Operation(summary = "Reset Password", description = "Request for Reset a Password Through Email")
    @PostMapping("resetPassword")
    public ResponseEntity<ApiResponseObject<Object>> requestPasswordReset(@RequestBody @Valid Object resetPasswordEmailDto) {
        return ResponseEntity.ok(new ApiResponseObject<>("You will receive an email with a link to retrieve your password if the email address is registered with us", true));
    }


    @Operation(summary = "Send New password", description = "Send New Password after Reset")
    @PostMapping("password")
    public ResponseEntity<ApiResponseObject<Object>> resetPassword(@RequestBody @Valid Object newPasswordDto) {
        return ResponseEntity.ok(new ApiResponseObject<>("Password reset successfully", true));
    }
}

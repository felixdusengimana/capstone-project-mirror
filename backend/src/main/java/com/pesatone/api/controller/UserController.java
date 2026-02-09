package com.pesatone.api.controller;

import com.pesatone.api.configuration.auth.RequestPrincipal;
import com.pesatone.api.model.dto.ApiResponseObject;
import com.pesatone.api.model.dto.UserDetailDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.service.UserService;
import com.querydsl.core.QueryResults;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name="2. User Management")
public class UserController {
    private final RequestPrincipal principal;
    private final UserService userService;

    @Operation(summary = "Get User", description = "Get an Existing User")
    @GetMapping("{id}")
    public ResponseEntity<ApiResponseObject<Object>> getUser(@PathVariable(name ="id") UUID id) {
        return ResponseEntity.ok(new ApiResponseObject<>("",true, null));
    }

    @Operation(summary = "List Users", description = "Search for Users")
    @GetMapping
    public ResponseEntity<ApiResponseObject<QueryResults<Object>>> searchUsers( @Valid Object filter) {
        return ResponseEntity.ok(new ApiResponseObject<>("Users retrieved successfully",
                true,null));
    }

    @Operation(summary = "Get User Profile", description = "Get LoggedIn User Profile")
    @GetMapping("/profile")
    public ResponseEntity<ApiResponseObject<AppUser>> getLoggedInUser() {
        AppUser user = principal.getLoggedInUser();
        return ResponseEntity.ok(new ApiResponseObject<>("User profile retrieved successfully", true, user));
    }

    @Operation(summary = "Update profile", description = "Update logged in user profile")
    @PutMapping("profile")
    @PreAuthorize("hasAnyAuthority(T(com.pesatone.api.model.enumeration.PermissionEnum).UPDATE_PROFILE)")
    public ResponseEntity<ApiResponseObject<AppUser>> updateUserProfile(@RequestBody @Valid UserDetailDto dto) {
        AppUser user = principal.getLoggedInUser();
        return ResponseEntity.ok(new ApiResponseObject<>("Profile updated successfully", true,
                userService.updateUserDetails(user, dto)));
    }
    
}

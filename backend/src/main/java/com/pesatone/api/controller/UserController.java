package com.pesatone.api.controller;

import com.pesatone.api.configuration.auth.RequestPrincipal;
import com.pesatone.api.model.dto.ApiResponseObject;
import com.pesatone.api.model.dto.UserDetailDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.service.UserService;
import com.querydsl.core.QueryResults;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
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

    @Operation(summary = "Update profile", description = "Update logged in user profile")
    @PostMapping("profile/image")
    @PreAuthorize("hasAnyAuthority(T(com.pesatone.api.model.enumeration.PermissionEnum).UPDATE_PROFILE)")
    public ResponseEntity<ApiResponseObject<String>> updateProfileImage(@Valid @RequestParam("image") MultipartFile file) {
        AppUser user = principal.getLoggedInUser();
        List<String> validImageFileTypes = List.of("image/png","image/jpg","image/jpeg");
        if(StringUtils.isBlank(file.getContentType()) || !validImageFileTypes.contains(file.getContentType())){
            throw new MultipartException("Please upload a valid image file (jpeg, png or jpg)");
        }
        return ResponseEntity.ok(new ApiResponseObject<>("Profile image uploaded successfully", true,
                userService.uploadProfileImage(user, file)));
    }
    
}

package com.pesatone.api.controller;

import com.pesatone.api.configuration.auth.RequestPrincipal;
import com.pesatone.api.exception.PesatoneNotFoundException;
import com.pesatone.api.model.dto.ApiResponseObject;
import com.pesatone.api.model.dto.CreatorApprovalDto;
import com.pesatone.api.model.dto.UserDetailDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.enumeration.RoleEnum;
import com.pesatone.api.model.pojo.DashboardPojo;
import com.pesatone.api.model.pojo.UserPojo;
import com.pesatone.api.model.search.filter.CreatorSearchFilter;
import com.pesatone.api.model.search.response.CreatorSearchResponse;
import com.pesatone.api.model.search.response.QueryResultPojo;
import com.pesatone.api.repository.AppUserRepository;
import com.pesatone.api.service.PaymentTransactionService;
import com.pesatone.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Copyright (c) 2026. Pesatone. All rights reserved
 *
 * @author phelixdusengimana@gmail.com
 **/

@RequiredArgsConstructor
@RestController
@RequestMapping("users")
@Slf4j
@Tag(name = "2. User Management")
public class UserController {
    private final RequestPrincipal principal;
    private final UserService userService;
    private final AppUserRepository userRepository;
    private final PaymentTransactionService transactionService;

    @Operation(summary = "Search Creators", description = "Search Creators by Name or Username")
    @GetMapping("/creators")
    public ResponseEntity<ApiResponseObject<QueryResultPojo<CreatorSearchResponse>>> searchCreators(@ParameterObject @Valid CreatorSearchFilter filter) {
        return ResponseEntity.ok(new ApiResponseObject<>("Creators retrieved successfully",
                true, userService.searchCreators(filter)));
    }

    @Operation(summary = "Get Creator's Profile", description = "Get Creators profile by Id or Username")
    @GetMapping("/creators/{reference}")
    public ResponseEntity<ApiResponseObject<UserPojo>> getCreator(@PathVariable String reference) {
        AppUser user;
        if (StringUtils.isNumeric(reference)) {
            user = userRepository.findActiveByIdAndRole(Long.valueOf(reference), RoleEnum.CREATOR)
                    .orElseThrow(() -> new PesatoneNotFoundException("Creator not found"));
        } else {
            user = userRepository.findActiveByUserNameAndRole(reference, RoleEnum.CREATOR)
                    .orElseThrow(() -> new PesatoneNotFoundException("Creator not found"));
        }
        return ResponseEntity.ok(new ApiResponseObject<>("Creator profile retrieved successfully",
                true, UserPojo.stripDetails(userService.getUserDetails(user))));
    }

    @Operation(summary = "Get Creator's Dashboard", description = "Get LoggedIn Creators Dashboard")
    @GetMapping("/creators/dashboard")
    @PreAuthorize("hasAnyAuthority(T(com.pesatone.api.model.enumeration.PermissionEnum).VIEW_CREATOR_DASHBOARD)")
    public ResponseEntity<ApiResponseObject<DashboardPojo>> getCreatorDashboard() {
        AppUser user = principal.getLoggedInUser();
        return ResponseEntity.ok(new ApiResponseObject<>("Creator dashboard retrieved successfully",
                true, transactionService.getDashboardDetails(user)));
    }

    @Operation(summary = "Get User Profile", description = "Get LoggedIn User Profile")
    @GetMapping("/profile")
    public ResponseEntity<ApiResponseObject<UserPojo>> getLoggedInUser() {
        return ResponseEntity.ok(new ApiResponseObject<>("User profile retrieved successfully",
                true, userService.getUserDetails(principal.getLoggedInUser())));
    }

    @Operation(summary = "Update profile", description = "Update logged in user profile")
    @PutMapping("profile")
    @PreAuthorize("hasAnyAuthority(T(com.pesatone.api.model.enumeration.PermissionEnum).UPDATE_PROFILE)")
    public ResponseEntity<ApiResponseObject<UserPojo>> updateUserProfile(@RequestBody @Valid UserDetailDto dto) {
        AppUser user = principal.getLoggedInUser();
        return ResponseEntity.ok(new ApiResponseObject<>("Profile updated successfully", true,
                userService.getUserDetails(userService.updateUserDetails(user, dto))));
    }

    @Operation(summary = "Update profile", description = "Update logged in user profile")
    @PostMapping("profile/image")
    @PreAuthorize("hasAnyAuthority(T(com.pesatone.api.model.enumeration.PermissionEnum).UPDATE_PROFILE)")
    public ResponseEntity<ApiResponseObject<String>> updateProfileImage(@Valid @RequestParam("image") MultipartFile file) {
        AppUser user = principal.getLoggedInUser();
        List<String> validImageFileTypes = List.of("image/png", "image/jpg", "image/jpeg");
        if (StringUtils.isBlank(file.getContentType()) || !validImageFileTypes.contains(file.getContentType())) {
            throw new MultipartException("Please upload a valid image file (jpeg, png or jpg)");
        }
        return ResponseEntity.ok(new ApiResponseObject<>("Profile image uploaded successfully", true,
                userService.uploadProfileImage(user, file)));
    }

    @Operation(summary = "Approve profile verification", description = "Approve user profile verification")
    @PostMapping("approvals")
    @PreAuthorize("hasAnyAuthority(T(com.pesatone.api.model.enumeration.PermissionEnum).APPROVE_USER)")
    public ResponseEntity<ApiResponseObject<UserPojo>> approveUserProfileVerification(@RequestBody @Valid CreatorApprovalDto dto) {
        AppUser creator = userRepository.findActiveById(dto.getCreatorId())
                .orElseThrow(() -> new PesatoneNotFoundException("Creator does not exist"));
        return ResponseEntity.ok(new ApiResponseObject<>("Profile approval request has been successfully processed", true,
                userService.getUserDetails(userService.approveCreatorAccount(creator, dto.getApprovalStatus()))));
    }

    @Operation(summary = "Delete account", description = "Delete account")
    @DeleteMapping()
    @PreAuthorize("hasAnyAuthority(T(com.pesatone.api.model.enumeration.PermissionEnum).DELETE_ACCOUNT)")
    public ResponseEntity<ApiResponseObject<String>> deleteAccount() {
        userService.deleteAccount(principal.getLoggedInUser());
        return ResponseEntity.ok(new ApiResponseObject<>("User account has been successfully deleted", true,null));
    }
}

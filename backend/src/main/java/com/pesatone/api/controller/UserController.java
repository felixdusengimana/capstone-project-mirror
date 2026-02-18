package com.pesatone.api.controller;

import com.pesatone.api.configuration.auth.RequestPrincipal;
import com.pesatone.api.exception.PesatoneNotFoundException;
import com.pesatone.api.model.dto.ApiResponseObject;
import com.pesatone.api.model.dto.UserDetailDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.enumeration.RoleEnum;
import com.pesatone.api.model.pojo.DashboardPojo;
import com.pesatone.api.model.pojo.UserPojo;
import com.pesatone.api.model.search.CreatorSearchFilter;
import com.pesatone.api.model.search.CreatorSearchResponse;
import com.pesatone.api.repository.AppUserRepository;
import com.pesatone.api.service.PaymentTransactionService;
import com.pesatone.api.service.UserService;
import com.querydsl.core.QueryResults;
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

@CrossOrigin
@RequiredArgsConstructor
@Controller
@RequestMapping("users")
@Slf4j
@Tag(name="2. User Management")
public class UserController {
    private final RequestPrincipal principal;
    private final UserService userService;
    private final AppUserRepository userRepository;
    private final PaymentTransactionService transactionService;

    @Operation(summary = "Search Creators", description = "Search Creators by Name or Username")
    @GetMapping("/creators")
    public ResponseEntity<ApiResponseObject<QueryResults<CreatorSearchResponse>>> searchCreators(@ParameterObject @Valid CreatorSearchFilter filter) {
        QueryResults<CreatorSearchResponse> response = userService.searchCreators(filter);
        return ResponseEntity.ok(new ApiResponseObject<>("Creators retrieved successfully",
                true,response));
    }

    @Operation(summary = "Get Creator's Profile", description = "Get Creators profile by Id")
    @GetMapping("/creators/{id}")
    public ResponseEntity<ApiResponseObject<UserPojo>> getCreator(@PathVariable Long id) {
        AppUser user = userRepository.findActiveByIdAndRole(id, RoleEnum.CREATOR)
                .orElseThrow(() -> new PesatoneNotFoundException("Creator not found"));
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
        List<String> validImageFileTypes = List.of("image/png","image/jpg","image/jpeg");
        if(StringUtils.isBlank(file.getContentType()) || !validImageFileTypes.contains(file.getContentType())){
            throw new MultipartException("Please upload a valid image file (jpeg, png or jpg)");
        }
        return ResponseEntity.ok(new ApiResponseObject<>("Profile image uploaded successfully", true,
                userService.uploadProfileImage(user, file)));
    }
    
}

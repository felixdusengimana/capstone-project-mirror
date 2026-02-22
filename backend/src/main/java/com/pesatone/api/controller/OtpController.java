package com.pesatone.api.controller;

import com.pesatone.api.configuration.auth.RequestPrincipal;
import com.pesatone.api.model.dto.ApiResponseObject;
import com.pesatone.api.model.dto.OtpRequestDto;
import com.pesatone.api.model.dto.VerifyOtpDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.service.OtpService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.BooleanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("otp")
@Tag(name="5. One Time Password")
public class OtpController {
    private final RequestPrincipal principal;
    private final OtpService otpService;

    @Operation(summary = "Request OTP", description = "Request OTP for email, phone or payout verification")
    @PostMapping()
    @PreAuthorize("hasAnyAuthority(T(com.pesatone.api.model.enumeration.PermissionEnum).VIEW_CREATOR_DASHBOARD)")
    public ResponseEntity<ApiResponseObject<String>> requestOtp(@RequestBody @Valid OtpRequestDto dto) {
        //TODO prevent DDOS attack
        AppUser user = principal.getLoggedInUser();
        otpService.sendOtp(user, dto.getOtpType());
        return ResponseEntity.ok(new ApiResponseObject<>("OTP generated and sent successfully", true, null));
    }

    @Operation(summary = "Verify OTP", description = "Verify OTP for email or phone")
    @PostMapping("verification")
    @PreAuthorize("hasAnyAuthority(T(com.pesatone.api.model.enumeration.PermissionEnum).VIEW_CREATOR_DASHBOARD)")
    public ResponseEntity<ApiResponseObject<String>> verifyOtp(@RequestBody @Valid VerifyOtpDto dto) {
        AppUser user = principal.getLoggedInUser();
        boolean verified = otpService.verifyOtp(user, dto.getOtpType(), dto.getOtp());
        if(BooleanUtils.isTrue(verified)){
            return ResponseEntity.ok(new ApiResponseObject<>("OTP verified successfully", true, null));
        }else {
            return ResponseEntity.badRequest().body(new ApiResponseObject<>("Could not verify OTP", false, null));
        }
    }

}

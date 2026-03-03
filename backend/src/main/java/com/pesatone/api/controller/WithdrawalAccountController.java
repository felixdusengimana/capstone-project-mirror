package com.pesatone.api.controller;

import com.pesatone.api.model.dto.ApiResponseObject;
import com.pesatone.api.model.dto.WithdrawalAccountDto;
import com.pesatone.api.model.entity.WithdrawalAccount;
import com.pesatone.api.model.pojo.WithdrawalAccountPojo;
import com.pesatone.api.service.WithdrawalAccountService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("withdrawal-accounts")
@Tag(name="7. Withdrawal Account")
public class WithdrawalAccountController {
    private final WithdrawalAccountService withdrawalAccountService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority(T(com.pesatone.api.model.enumeration.PermissionEnum).VIEW_WITHDRAWAL_ACCOUNT)")
    public ResponseEntity<ApiResponseObject<List<WithdrawalAccountPojo>>> getWithdrawalAccounts() {
        return ResponseEntity.ok(new ApiResponseObject<>("Withdrawal accounts retrieved", true,
                withdrawalAccountService.getAccounts()));
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority(T(com.pesatone.api.model.enumeration.PermissionEnum).CREATE_WITHDRAWAL_ACCOUNT)")
    public ResponseEntity<ApiResponseObject<WithdrawalAccountPojo>> createWithdrawalAccount(@RequestBody @Valid WithdrawalAccountDto dto) {
        WithdrawalAccount account = withdrawalAccountService.createAccount(dto);
        return ResponseEntity.ok(new ApiResponseObject<>("Withdrawal account created", true,
                new WithdrawalAccountPojo(account)));
    }

    @PatchMapping("{id}")
    @PreAuthorize("hasAnyAuthority(T(com.pesatone.api.model.enumeration.PermissionEnum).UPDATE_WITHDRAWAL_ACCOUNT)")
    public ResponseEntity<ApiResponseObject<WithdrawalAccountPojo>> updateWithdrawalAccount(@RequestBody @Valid WithdrawalAccountDto dto,
                                                                                            @PathVariable Long id) {
        WithdrawalAccount account = withdrawalAccountService.updateAccount(id, dto);
        return ResponseEntity.ok(new ApiResponseObject<>("Withdrawal account updated", true,
                new WithdrawalAccountPojo(account)));
    }
}

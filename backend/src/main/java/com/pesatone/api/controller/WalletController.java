package com.pesatone.api.controller;

import com.pesatone.api.configuration.auth.RequestPrincipal;
import com.pesatone.api.model.dto.ApiResponseObject;
import com.pesatone.api.model.entity.Wallet;
import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.pojo.WalletPojo;
import com.pesatone.api.service.WalletService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("wallets")
@Tag(name="6. Wallet")
public class WalletController {
    private final WalletService walletService;
    private final RequestPrincipal principal;

    @GetMapping("{currency}")
    @PreAuthorize("hasAnyAuthority(T(com.pesatone.api.model.enumeration.PermissionEnum).VIEW_WALLET)")
    public ResponseEntity<ApiResponseObject<WalletPojo>> getWallet(@PathVariable String currency) {
        CurrencyEnum curr;
        try {
            curr = CurrencyEnum.valueOf(currency.toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ApiResponseObject<>("Invalid currency", false, null));
        }
        Wallet wallet = walletService.getOrCreateWallet(principal.getLoggedInUser(), curr);
        return ResponseEntity.ok(new ApiResponseObject<>("Wallet", true,
                new WalletPojo(wallet.getBalance(),wallet.getCurrency())));
    }
}

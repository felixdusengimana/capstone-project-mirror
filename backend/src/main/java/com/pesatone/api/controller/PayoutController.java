package com.pesatone.api.controller;

import com.pesatone.api.configuration.auth.RequestPrincipal;
import com.pesatone.api.exception.PesatoneNotFoundException;
import com.pesatone.api.model.dto.ApiResponseObject;
import com.pesatone.api.model.dto.PayoutRequestDto;
import com.pesatone.api.model.dto.flw.FlwCallBackDto;
import com.pesatone.api.model.dto.flw.FlwPayoutDetail;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.PaymentTransaction;
import com.pesatone.api.model.entity.Payout;
import com.pesatone.api.model.pojo.PaymentTransactionPojo;
import com.pesatone.api.model.pojo.PayoutPojo;
import com.pesatone.api.model.search.filter.PayoutSearchFilter;
import com.pesatone.api.model.search.response.PayoutSearchResponse;
import com.pesatone.api.model.search.response.QueryResultPojo;
import com.pesatone.api.service.PaymentProcessingService;
import com.pesatone.api.service.PayoutService;
import com.pesatone.api.util.AppUtil;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("payouts")
@Tag(name = "4. Payout Controller")
public class PayoutController {
    private final PayoutService payoutService;
    private final RequestPrincipal principal;

    @Operation(summary = "Initiate Payout", description = "Initiate a payout request")
    @PostMapping("/initiate")
    @PreAuthorize("hasAnyAuthority(T(com.pesatone.api.model.enumeration.PermissionEnum).CREATE_PAYOUT)")
    public ResponseEntity<ApiResponseObject<String>> initiatePayout(@RequestBody @Valid PayoutRequestDto dto) {
        AppUser user = principal.getLoggedInUser();
        payoutService.initiatePayout(user, dto);
        return ResponseEntity.ok(new ApiResponseObject<>("Payout initiated successfully", true, null));
    }

    @Operation(summary = "Get Payout", description = "Get payout detail")
    @GetMapping("/{transactionReference}")
    @PreAuthorize("hasAnyAuthority(T(com.pesatone.api.model.enumeration.PermissionEnum).VIEW_PAYOUT)")
    public Mono<ResponseEntity<ApiResponseObject<PayoutPojo>>> getPayout(@PathVariable String transactionReference) {
        Payout payout = payoutService.getByReference(transactionReference);
        if(principal.isCreator() && !payout.getCreator().getId().equals(principal.getLoggedInUser().getId())){
            throw new PesatoneNotFoundException("Payout not found");
        }
        return payoutService.checkMomoPayoutStatus(payout)
                .map(txn -> ResponseEntity.ok(new ApiResponseObject<>("Payout retrieved successfully",
                        true, new PayoutPojo(txn))));
    }

    @Operation(summary = "Search Payout", description = "Search Payouts with Parameters")
    @GetMapping()
    @PreAuthorize("hasAnyAuthority(T(com.pesatone.api.model.enumeration.PermissionEnum).VIEW_PAYOUT)")
    public ResponseEntity<ApiResponseObject<QueryResultPojo<PayoutSearchResponse>>> searchPayout(@ParameterObject @Valid PayoutSearchFilter filter) {
        return ResponseEntity.ok(new ApiResponseObject<>("Payouts retrieved successfully",
                true, payoutService.searchPayouts(filter)));
    }

}

package com.pesatone.api.controller;

import com.pesatone.api.model.dto.ApiResponseObject;
import com.pesatone.api.model.dto.TransactionDto;
import com.pesatone.api.model.entity.AppUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("transactions")
@Tag(name="3. Transaction")
public class PaymentTransactionController {

    @CrossOrigin
    @Operation(summary = "Initiate Transaction", description = "Initiate payment transaction")
    @PostMapping("intitate")
    public ResponseEntity<ApiResponseObject<AppUser>> initiateTransaction(@RequestBody @Valid TransactionDto dto,
                                                             BindingResult bindingResult) throws BindException {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }

        return ResponseEntity.ok(new ApiResponseObject<>("User signup successful", true, null));
    }
}

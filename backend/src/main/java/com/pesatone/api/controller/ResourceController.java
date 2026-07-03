package com.pesatone.api.controller;

import com.pesatone.api.model.dto.ApiResponseObject;
import com.pesatone.api.model.dto.BankDto;
import com.pesatone.api.model.dto.CountryDto;
import com.pesatone.api.model.dto.IndustryDto;
import com.pesatone.api.model.dto.ValidationDto;
import com.pesatone.api.model.pojo.BankResponse;
import com.pesatone.api.model.pojo.CountryResponse;
import com.pesatone.api.model.pojo.IndustryResponse;
import com.pesatone.api.repository.AppUserRepository;
import com.pesatone.api.service.ResourceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("resources")
@Tag(name="7. Resource Controller")
public class ResourceController {
    private static final String MANAGE_RESOURCES =
            "hasAnyAuthority(T(com.pesatone.api.model.enumeration.PermissionEnum).MANAGE_RESOURCES)";

    private final AppUserRepository userRepository;
    private final ResourceService resourceService;

    @Operation(summary = "Get industries", description = "Get list of industries")
    @GetMapping("/industries")
    public ResponseEntity<ApiResponseObject<List<IndustryResponse>>> getIndustries() {
        return ResponseEntity.ok(new ApiResponseObject<>("Industries retrieved", true,
                resourceService.getIndustries()));
    }

    @Operation(summary = "Create industry", description = "Add a new industry")
    @PostMapping("/industries")
    @PreAuthorize(MANAGE_RESOURCES)
    public ResponseEntity<ApiResponseObject<IndustryResponse>> createIndustry(@RequestBody @Valid IndustryDto dto) {
        return new ResponseEntity<>(new ApiResponseObject<>("Industry created successfully", true,
                resourceService.createIndustry(dto)), HttpStatus.CREATED);
    }

    @Operation(summary = "Update industry", description = "Update an existing industry")
    @PutMapping("/industries/{id}")
    @PreAuthorize(MANAGE_RESOURCES)
    public ResponseEntity<ApiResponseObject<IndustryResponse>> updateIndustry(@PathVariable Long id,
                                                                              @RequestBody @Valid IndustryDto dto) {
        return ResponseEntity.ok(new ApiResponseObject<>("Industry updated successfully", true,
                resourceService.updateIndustry(id, dto)));
    }

    @Operation(summary = "Deactivate industry", description = "Deactivate an industry")
    @DeleteMapping("/industries/{id}")
    @PreAuthorize(MANAGE_RESOURCES)
    public ResponseEntity<ApiResponseObject<String>> deactivateIndustry(@PathVariable Long id) {
        resourceService.deactivateIndustry(id);
        return ResponseEntity.ok(new ApiResponseObject<>("Industry deactivated successfully", true, null));
    }

    @Operation(summary = "Get countries", description = "Get list of supported countries")
    @GetMapping("/countries")
    public ResponseEntity<ApiResponseObject<List<CountryResponse>>> getCountries() {
        return ResponseEntity.ok(new ApiResponseObject<>("Countries retrieved", true,
                resourceService.getCountries()));
    }

    @Operation(summary = "Create country", description = "Add a new country")
    @PostMapping("/countries")
    @PreAuthorize(MANAGE_RESOURCES)
    public ResponseEntity<ApiResponseObject<CountryResponse>> createCountry(@RequestBody @Valid CountryDto dto) {
        return new ResponseEntity<>(new ApiResponseObject<>("Country created successfully", true,
                resourceService.createCountry(dto)), HttpStatus.CREATED);
    }

    @Operation(summary = "Update country", description = "Update an existing country")
    @PutMapping("/countries/{id}")
    @PreAuthorize(MANAGE_RESOURCES)
    public ResponseEntity<ApiResponseObject<CountryResponse>> updateCountry(@PathVariable Long id,
                                                                            @RequestBody @Valid CountryDto dto) {
        return ResponseEntity.ok(new ApiResponseObject<>("Country updated successfully", true,
                resourceService.updateCountry(id, dto)));
    }

    @Operation(summary = "Deactivate country", description = "Deactivate a country")
    @DeleteMapping("/countries/{id}")
    @PreAuthorize(MANAGE_RESOURCES)
    public ResponseEntity<ApiResponseObject<String>> deactivateCountry(@PathVariable Long id) {
        resourceService.deactivateCountry(id);
        return ResponseEntity.ok(new ApiResponseObject<>("Country deactivated successfully", true, null));
    }

    /* ===================== Banks ===================== */

    @Operation(summary = "Get Banks", description = "Get list of Banks")
    @GetMapping("/banks")
    public ResponseEntity<ApiResponseObject<List<BankResponse>>> getBanks() {
        return ResponseEntity.ok(new ApiResponseObject<>("Bank retrieved successfully", true,
                resourceService.getBanks()));
    }

    @Operation(summary = "Create bank", description = "Add a new bank")
    @PostMapping("/banks")
    @PreAuthorize(MANAGE_RESOURCES)
    public ResponseEntity<ApiResponseObject<BankResponse>> createBank(@RequestBody @Valid BankDto dto) {
        return new ResponseEntity<>(new ApiResponseObject<>("Bank created successfully", true,
                resourceService.createBank(dto)), HttpStatus.CREATED);
    }

    @Operation(summary = "Update bank", description = "Update an existing bank")
    @PutMapping("/banks/{id}")
    @PreAuthorize(MANAGE_RESOURCES)
    public ResponseEntity<ApiResponseObject<BankResponse>> updateBank(@PathVariable Long id,
                                                                      @RequestBody @Valid BankDto dto) {
        return ResponseEntity.ok(new ApiResponseObject<>("Bank updated successfully", true,
                resourceService.updateBank(id, dto)));
    }

    @Operation(summary = "Deactivate bank", description = "Deactivate a bank")
    @DeleteMapping("/banks/{id}")
    @PreAuthorize(MANAGE_RESOURCES)
    public ResponseEntity<ApiResponseObject<String>> deactivateBank(@PathVariable Long id) {
        resourceService.deactivateBank(id);
        return ResponseEntity.ok(new ApiResponseObject<>("Bank deactivated successfully", true, null));
    }


    @Operation(summary = "Validate resource", description = "Check if a resource exists")
    @PostMapping("/validation")
    public ResponseEntity<ApiResponseObject<Object>> validateResource(@RequestBody @Valid ValidationDto dto) {
        boolean exists = false;
        switch (dto.getResourceType()) {
            case PESA_TAG -> exists = userRepository.findByUserName(dto.getValue()).isPresent();
        }

        if(exists){
            return new ResponseEntity<>(new ApiResponseObject<>("Resource not available", false), HttpStatus.CONFLICT);
        }else {
            return new ResponseEntity<>(new ApiResponseObject<>("Resource available", true), HttpStatus.OK);
        }
    }
}

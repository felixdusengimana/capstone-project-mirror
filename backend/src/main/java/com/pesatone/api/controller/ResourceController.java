package com.pesatone.api.controller;

import com.pesatone.api.model.dto.ApiResponseObject;
import com.pesatone.api.model.dto.ValidationDto;
import com.pesatone.api.model.entity.Country;
import com.pesatone.api.model.entity.Industry;
import com.pesatone.api.model.pojo.BankPojo;
import com.pesatone.api.repository.AppUserRepository;
import com.pesatone.api.repository.BankRepository;
import com.pesatone.api.repository.CountryRepository;
import com.pesatone.api.repository.IndustryRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("resources")
@Tag(name="7. Resource Controller")
public class ResourceController {
    private final CountryRepository countryRepository;
    private final IndustryRepository industryRepository;
    private final AppUserRepository userRepository;
    private final BankRepository bankRepository;

    @Operation(summary = "Get countries", description = "Get list of supported countries")
    @GetMapping("/countries")
    public ResponseEntity<ApiResponseObject<List<Country>>> getCountries() {
        return ResponseEntity.ok(new ApiResponseObject<>("Countries retrieved", true,
                countryRepository.findAll(Sort.by(Sort.Direction.ASC, "name"))));
    }

    @Operation(summary = "Get industries", description = "Get list of industries")
    @GetMapping("/industries")
    public ResponseEntity<ApiResponseObject<List<Industry>>> getIndustries() {
        return ResponseEntity.ok(new ApiResponseObject<>("Industries retrieved", true,
                industryRepository.findAll(Sort.by(Sort.Direction.ASC, "name"))));
    }

    @Operation(summary = "Get Banks", description = "Get list of Banks")
    @GetMapping("/banks")
    public ResponseEntity<ApiResponseObject<List<BankPojo>>> getBanks() {
        return ResponseEntity.ok(new ApiResponseObject<>("Bank retrieved successfully", true,
                bankRepository.findAllSorted(Sort.by(Sort.Direction.ASC, "name"))));
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

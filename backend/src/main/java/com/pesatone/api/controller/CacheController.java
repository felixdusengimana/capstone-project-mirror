package com.pesatone.api.controller;

import com.pesatone.api.model.dto.ApiResponseObject;
import com.pesatone.api.service.CacheService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("admin/cache")
@Tag(name = "8. Admin")
public class CacheController {
    private static final String MANAGE_RESOURCES =
            "hasAnyAuthority(T(com.pesatone.api.model.enumeration.PermissionEnum).MANAGE_RESOURCES)";

    private final CacheService cacheService;

    @Operation(summary = "Clear cache",
            description = "Evict a single cache by name (?name=creatorSearch) or all caches if no name is given")
    @DeleteMapping
    @PreAuthorize(MANAGE_RESOURCES)
    public ResponseEntity<ApiResponseObject<List<String>>> clearCache(@RequestParam(required = false) String name) {
        return ResponseEntity.ok(new ApiResponseObject<>("Cache cleared", true, cacheService.clear(name)));
    }
}

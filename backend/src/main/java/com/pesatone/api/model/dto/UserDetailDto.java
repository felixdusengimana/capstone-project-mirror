package com.pesatone.api.model.dto;

import com.pesatone.api.model.validator.UniqueUserName;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class UserDetailDto {
    @Schema(name = "username",
            description = "PesaTag for identification",
            example = "pesatag")
    @UniqueUserName
    // optional, but when present: 3-30 chars of a-z 0-9 . _ , no leading/trailing or consecutive dots
    @Pattern(regexp = "^$|^(?!.*\\.\\.)[a-z0-9_][a-z0-9._]{1,28}[a-z0-9_]$",
            message = "Pesatag must be 3-30 chars of lowercase letters, numbers, '.' or '_' (no leading/trailing or double dots)")
    private String username;

    @Schema(name = "name",
            description = "Full name of the user",
            example = "Okoro Kunde")
    private String name;

    @Schema(name = "phoneNumber",
            description = "PhoneNumber of the user",
            example = "07xxxxxxxx")
    private String phoneNumber;

    @Schema(name = "bio",
            description = "Full name of the user",
            example = "A short bio")
    private String bio;

    @Schema(name = "countryIsoCode",
            description = "Country ISO Code",
            example = "RWA")
    private String countryIsoCode;

    @Schema(name = "industryCode",
            description = "Industry code",
            example = "MUS")
    private String industryCode;

    private List<@Valid SocialLinkDto> socialLinks;


}

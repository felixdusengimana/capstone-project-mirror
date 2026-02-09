package com.pesatone.api.model.dto;

import com.pesatone.api.model.validator.UniqueUserName;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class UserDetailDto {
    @Schema(name = "username",
            description = "PesaTag for identification",
            example = "PesaTag")
    @UniqueUserName
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

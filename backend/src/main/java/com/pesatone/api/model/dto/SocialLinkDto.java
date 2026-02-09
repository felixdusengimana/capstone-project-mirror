package com.pesatone.api.model.dto;

import com.pesatone.api.model.enumeration.SocialPlatformEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SocialLinkDto {
    @Schema(name = "link",
            description = "Social link",
            example = "www.link.com")
    @NotBlank(message = "link is required")
    private String link;

    @Schema(name = "platform",
            description = "Social platform",
            example = "FACEBOOK")
    @NotNull(message = "platform is required")
    private SocialPlatformEnum platform;
}

package com.pesatone.api.model.dto;

import com.pesatone.api.model.enumeration.ApprovalStatusEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatorApprovalDto {
    @Schema(name = "creatorId",
            description = "Id of creator",
            example = "12")
    @NotNull(message = "Creator id is required")
    private Long creatorId;

    @NotNull(message = "Approval Status is required")
    @Schema(name = "approvalStatus",
            description = "Approval Status",
            example = "APPROVED", requiredMode = Schema.RequiredMode.REQUIRED)
    private ApprovalStatusEnum approvalStatus;
}

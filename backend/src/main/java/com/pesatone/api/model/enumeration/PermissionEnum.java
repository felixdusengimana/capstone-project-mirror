package com.pesatone.api.model.enumeration;

import lombok.Getter;

@Getter
public enum PermissionEnum {
    VIEW_USER("View user details"),
    USER_DELETE("Delete user"),
    UPDATE_PROFILE("Update user profile"),
    VIEW_CREATOR_DASHBOARD("View creator dashboard"),
    APPROVE_USER("Approve or reject user registration"),
    UPDATE_USER_STATUS("Activate or deactivate user"),
    VIEW_PAYOUT("View payout"),
    CREATE_PAYOUT("Create payout"),
    VIEW_TRANSACTION("View transactions");

    private final String description;

    PermissionEnum(String description) {
        this.description = description;
    }
}

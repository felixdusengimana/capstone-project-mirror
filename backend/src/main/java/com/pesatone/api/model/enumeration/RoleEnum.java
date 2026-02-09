package com.pesatone.api.model.enumeration;

import lombok.Getter;

import java.util.*;

/**
 * Copyright (c) 2026. Pesatone. All rights reserved
 *
 * @author phelixdusengimana@gmail.com
 * Created On   March, 2026
 **/

@Getter
public enum RoleEnum {
    ADMIN("Admin",
            PermissionEnum.VIEW_USER,
            PermissionEnum.APPROVE_USER,
            PermissionEnum.USER_DELETE,
            PermissionEnum.UPDATE_USER_STATUS,
            PermissionEnum.VIEW_PAYOUT,
            PermissionEnum.VIEW_TRANSACTION,
            PermissionEnum.UPDATE_PROFILE),
    CREATOR("Creator",
            PermissionEnum.CREATE_PAYOUT,
            PermissionEnum.VIEW_PAYOUT,
            PermissionEnum.VIEW_TRANSACTION,
            PermissionEnum.UPDATE_PROFILE),
    FAN("Fan",
            PermissionEnum.VIEW_TRANSACTION,
            PermissionEnum.UPDATE_PROFILE)

;

    private final String description;
    private final Set<PermissionEnum> permissions;

    RoleEnum(String description, PermissionEnum... permissions) {
        this.description = description;
        this.permissions = new HashSet<>(Arrays.asList(permissions));
    }

    public String getRoleName(){
        return "ROLE_"+this.name();
    }

}

package com.pesatone.api.configuration.auth;

import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.enumeration.ApprovalStatusEnum;
import lombok.Getter;
import lombok.Setter;

/**
 * Copyright (c) 2026. Pesatone. All rights reserved
 *
 * @author phelixdusengimana@gmail.com
 * Created On   March, 2026
 **/

@Getter
@Setter
public class AppPrincipal {
    private String name;
    private String email;
    private String phoneNumber;
    private ApprovalStatusEnum approvalStatus;
    private Long userId;
    private String sessionId;
    public AppPrincipal (AppUser appUser){
        setEmail(appUser.getEmail());
        setName(appUser.getName());
        setPhoneNumber(appUser.getPhoneNumber());
        setUserId(appUser.getId());
        setApprovalStatus(appUser.getApprovalStatus());
    }
}

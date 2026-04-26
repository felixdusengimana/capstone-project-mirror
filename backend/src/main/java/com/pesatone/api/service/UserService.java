package com.pesatone.api.service;

import com.pesatone.api.model.dto.SignUpDto;
import com.pesatone.api.model.dto.UserDetailDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.enumeration.ApprovalStatusEnum;
import com.pesatone.api.model.enumeration.ImageTypeEnum;
import com.pesatone.api.model.enumeration.RoleEnum;
import com.pesatone.api.model.pojo.UserPojo;
import com.pesatone.api.model.search.filter.CreatorSearchFilter;
import com.pesatone.api.model.search.response.CreatorSearchResponse;
import com.pesatone.api.model.search.response.QueryResultPojo;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    AppUser signUp(SignUpDto dto, RoleEnum role);

    AppUser updateUserDetails(AppUser user, UserDetailDto dto);

    String uploadImage(AppUser user, MultipartFile file, ImageTypeEnum type);

    void initiatePasswordReset(AppUser user);

    void resetPassword(Long userId, String password);

    UserPojo getCreator(String reference);

    UserPojo getUserDetails(AppUser user);

    QueryResultPojo<CreatorSearchResponse> searchCreators(CreatorSearchFilter filter);

    AppUser approveCreatorAccount(AppUser creator, ApprovalStatusEnum approvalStatus);

    void deleteAccount(AppUser user);
}

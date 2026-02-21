package com.pesatone.api.service;

import com.pesatone.api.model.dto.SignUpDto;
import com.pesatone.api.model.dto.UserDetailDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.enumeration.RoleEnum;
import com.pesatone.api.model.pojo.UserPojo;
import com.pesatone.api.model.search.CreatorSearchFilter;
import com.pesatone.api.model.search.CreatorSearchResponse;
import com.pesatone.api.model.search.QueryResultPojo;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    AppUser signUp(SignUpDto dto, RoleEnum role);

    AppUser updateUserDetails(AppUser user, UserDetailDto dto);

    String uploadProfileImage(AppUser user, MultipartFile file);

    void initiatePasswordReset(AppUser user);

    void resetPassword(Long userId, String password);

    UserPojo getUserDetails(AppUser user);

    QueryResultPojo<CreatorSearchResponse> searchCreators(CreatorSearchFilter filter);
}

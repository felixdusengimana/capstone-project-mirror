package com.pesatone.api.model.pojo;

import com.pesatone.api.model.dto.SocialLinkDto;
import com.pesatone.api.model.entity.AppUser;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import java.util.List;

@Getter @Setter
public class UserPojo extends AppUser {
    public UserPojo(AppUser user){
        BeanUtils.copyProperties(user, this);
    }
    private String countryName;
    private String industryName;
    private List<SocialLinkDto> socialLinks;
}

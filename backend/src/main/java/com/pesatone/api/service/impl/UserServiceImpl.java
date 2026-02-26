package com.pesatone.api.service.impl;

import com.blazebit.persistence.*;
import com.blazebit.persistence.querydsl.BlazeJPAQuery;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.pesatone.api.exception.PesatoneException;
import com.pesatone.api.exception.PesatoneNotFoundException;
import com.pesatone.api.model.dto.SignUpDto;
import com.pesatone.api.model.dto.SocialLinkDto;
import com.pesatone.api.model.dto.UserDetailDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.QAppUser;
import com.pesatone.api.model.entity.SocialLink;
import com.pesatone.api.model.enumeration.ApprovalStatusEnum;
import com.pesatone.api.model.enumeration.RoleEnum;
import com.pesatone.api.model.enumeration.StatusEnum;
import com.pesatone.api.model.pojo.UserPojo;
import com.pesatone.api.model.search.filter.CreatorSearchFilter;
import com.pesatone.api.model.search.response.CreatorSearchResponse;
import com.pesatone.api.model.search.response.QueryResultPojo;
import com.pesatone.api.repository.AppUserRepository;
import com.pesatone.api.repository.CountryRepository;
import com.pesatone.api.repository.IndustryRepository;
import com.pesatone.api.repository.SocialLinkRepository;
import com.pesatone.api.service.NotificationService;
import com.pesatone.api.service.PesatoneTokenService;
import com.pesatone.api.service.UserService;
import com.querydsl.core.types.Projections;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CountryRepository countryRepository;
    private final IndustryRepository industryRepository;
    private final SocialLinkRepository socialLinkRepository;
    private final Cloudinary cloudinary;
    private final PesatoneTokenService tokenService;
    private final CriteriaBuilderFactory builderFactory;
    private final EntityManager entityManager;
    private final NotificationService notificationService;

    @Value("${application.passwordResetUrl}")
    private String passwordResetUrl;
    @Value("${application.jwtExpiry}")
    Integer jwtExpiry;

    @Transactional
    @Override
    public AppUser signUp(SignUpDto dto, RoleEnum role) {
        AppUser user = new AppUser();
        user.setEmail(dto.getEmail().toLowerCase());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setStatus(StatusEnum.ACTIVE);
        user.setRole(role);
        return userRepository.save(user);
    }

    @Transactional
    @Override
    public AppUser updateUserDetails(AppUser user, UserDetailDto dto) {
        if(!Boolean.TRUE.equals(user.getEmailVerified())){
            throw new IllegalArgumentException("Please verify your email to proceed");
        }
        if (StringUtils.isNotBlank(dto.getUsername())) user.setUsername(dto.getUsername().toLowerCase());
        if (StringUtils.isNotBlank(dto.getName())) user.setName(dto.getName());
        if (StringUtils.isNotBlank(dto.getPhoneNumber())) user.setPhoneNumber(dto.getPhoneNumber());
        if (StringUtils.isNotBlank(dto.getBio())) user.setBio(dto.getBio());

        if (StringUtils.isNotBlank(dto.getCountryIsoCode())) {
            countryRepository.findActiveByIsoCode(dto.getCountryIsoCode())
                    .ifPresent(user::setCountry);
        }
        if (StringUtils.isNotBlank(dto.getIndustryCode())) {
            industryRepository.findActiveByCode(dto.getIndustryCode())
                    .ifPresent(user::setIndustry);
        }
        if (dto.getSocialLinks() != null && !dto.getSocialLinks().isEmpty()) {
            setSocialLinks(user, dto.getSocialLinks());
        }

        userRepository.save(user);
        return user;
    }

    @Transactional
    @Override
    public String uploadProfileImage(AppUser user, MultipartFile file) {
        String secureUrl = null;
        try {
            Map uploadedFile = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap("public_id", file.getName()+"-"+System.currentTimeMillis(),
                            "folder", "profile_images"));
            secureUrl = (String) uploadedFile.get("secure_url");
            user.setProfileImageUrl(secureUrl);
            userRepository.save(user);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return secureUrl;
    }

    @Override
    public void initiatePasswordReset(AppUser user) {
        String token = tokenService.getPasswordResetToken(user);
        notificationService.sendEmail(user.getEmail(),"Password reset",
                "<b>Hello "+ StringUtils.defaultIfBlank(user.getName()," ") +",</b> <br/>" +
                        "Did you forget your password and would like to get new credentials? <br/>" +
                        "Please reset your password by clicking the link below. <br/> " +
                passwordResetUrl+token+
                "<br/><br/> This token will expire in "+ jwtExpiry/60 +" minutes");
    }

    @Transactional
    @Override
    public void resetPassword(Long userId, String password) {
        AppUser user = userRepository.findActiveById(userId)
                .orElseThrow(() -> new PesatoneNotFoundException("User not found"));

        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    @Override
    public UserPojo getUserDetails(AppUser user) {
        UserPojo pojo = new UserPojo(user);
        if (user.getCountry() != null) {
            countryRepository.findById(user.getCountry().getId())
                    .ifPresent(country -> pojo.setCountryName(country.getName()));
        }
        if (user.getIndustry() != null) {
            industryRepository.findById(user.getIndustry().getId())
                    .ifPresent(ind -> pojo.setIndustryName(ind.getName()));
        }

        pojo.setSocialLinks(socialLinkRepository.findByAppUser(user)
                .stream()
                .map(link -> new SocialLinkDto(link.getLink(), link.getPlatform()))
                .toList());

        return pojo;
    }

    @Override
    public QueryResultPojo<CreatorSearchResponse> searchCreators(CreatorSearchFilter filter) {
        QAppUser qAppUser = QAppUser.appUser;
        BlazeJPAQuery<AppUser> blazeQuery = new BlazeJPAQuery<>(entityManager, builderFactory);

        blazeQuery.from(qAppUser)
                .where(qAppUser.status.eq(StatusEnum.ACTIVE)
                        .and(qAppUser.role.eq(RoleEnum.CREATOR))
                        .and(qAppUser.name.isNotNull())
                        .and(qAppUser.username.isNotNull())
                );

        if (StringUtils.isNotBlank(filter.getName())) {
            blazeQuery.where(qAppUser.username.contains(filter.getName().toLowerCase())
                            .or(qAppUser.name.containsIgnoreCase(filter.getName())));
        }

        blazeQuery.orderBy(qAppUser.username.asc(),qAppUser.verified.desc().nullsLast(), qAppUser.id.asc());

        PagedList<CreatorSearchResponse> pagedList = blazeQuery
                .select(Projections.constructor(
                                CreatorSearchResponse.class,
                                qAppUser.id,
                                qAppUser.username,
                                qAppUser.name,
                                qAppUser.profileImageUrl,
                                qAppUser.verified
                        ))
                .fetchPage(filter.getOffset(), filter.getPageSize());

        return new QueryResultPojo<>(pagedList, filter.getPageNumber(), filter.getPageSize(), pagedList.getTotalPages());
    }

    @Transactional
    @Override
    public AppUser approveCreatorAccount(AppUser creator, ApprovalStatusEnum approvalStatus) {
        if(creator.getRole().equals(RoleEnum.CREATOR)){
                creator.setApprovalStatus(approvalStatus);
                if(approvalStatus.equals(ApprovalStatusEnum.APPROVED)) {
                    creator.setVerified(true);
                }
                userRepository.save(creator);
                return creator;
        }
        throw new PesatoneException("Invalid user type");
    }

    @Transactional
    @Override
    public void deleteAccount(AppUser user) {
        user.setStatus(StatusEnum.DELETED);
        userRepository.save(user);
    }

    private void setSocialLinks(AppUser user, List<SocialLinkDto> linkDtos) {
        List<SocialLink> links = new ArrayList<>();
        for (SocialLinkDto linkDto : linkDtos) {
            SocialLink link = socialLinkRepository.findByAppUserAndPlatform(user, linkDto.getPlatform())
                    .orElseGet(() -> {
                        SocialLink newLink = new SocialLink();
                        newLink.setLink(linkDto.getLink());
                        newLink.setPlatform(linkDto.getPlatform());
                        newLink.setAppUser(user);
                        newLink.setStatus(StatusEnum.ACTIVE);
                        return newLink;
                    });
            links.add(link);
        }
        socialLinkRepository.saveAll(links);
    }
}

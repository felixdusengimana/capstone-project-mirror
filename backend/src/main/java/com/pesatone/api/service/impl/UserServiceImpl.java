package com.pesatone.api.service.impl;

import com.blazebit.persistence.*;
import com.blazebit.persistence.querydsl.BlazeJPAQuery;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.google.gson.Gson;
import com.pesatone.api.exception.PesatoneException;
import com.pesatone.api.exception.PesatoneNotFoundException;
import com.pesatone.api.model.dto.SignUpDto;
import com.pesatone.api.model.dto.SocialLinkDto;
import com.pesatone.api.model.dto.UserDetailDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.QAppUser;
import com.pesatone.api.model.entity.QPaymentTransaction;
import com.pesatone.api.model.entity.SocialLink;
import com.pesatone.api.model.enumeration.ApprovalStatusEnum;
import com.pesatone.api.model.enumeration.CurrencyEnum;
import com.pesatone.api.model.enumeration.ImageTypeEnum;
import com.pesatone.api.model.enumeration.PaymentStatusEnum;
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
import com.pesatone.api.service.WalletService;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
@Slf4j
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
    private final Gson gson;
    private final WalletService walletService;

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
    @CacheEvict(value = "creator", key = "T(java.lang.String).valueOf(#user.id)")
    public AppUser updateUserDetails(AppUser user, UserDetailDto dto) {
        user = userRepository.findActiveById(user.getId()).orElse(user);
        if (!Boolean.TRUE.equals(user.getEmailVerified())) {
            throw new IllegalArgumentException("Please verify your email to proceed");
        }
        log.info("Profile update request: {}", gson.toJson(dto));
        if (StringUtils.isNotBlank(dto.getUsername())) {
            user.setUsername(dto.getUsername().toLowerCase());
        }
        if (StringUtils.isNotBlank(dto.getName())) {
            user.setName(dto.getName());
        }
        if (StringUtils.isNotBlank(dto.getPhoneNumber())) {
            user.setPhoneNumber(dto.getPhoneNumber());
        }
        if (StringUtils.isNotBlank(dto.getBio())) {
            user.setBio(dto.getBio());
        }
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
    @CacheEvict(value = "creator", key = "T(java.lang.String).valueOf(#user.id)")
    public String uploadImage(AppUser user, MultipartFile file, ImageTypeEnum type) {
        String secureUrl = null;
        try {
            String folder = "profile_images";
            if (type.equals(ImageTypeEnum.VERIFICATION_IMAGE)) {
                folder = "verification_images";
            }
            Map uploadedFile = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap("public_id", file.getName() + "-" + System.currentTimeMillis(),
                            "folder", folder));
            secureUrl = (String) uploadedFile.get("secure_url");

            if (type.equals(ImageTypeEnum.VERIFICATION_IMAGE)) {
                user.setVerificationImageUrl(secureUrl);
            } else {
                user.setProfileImageUrl(secureUrl);
            }
            userRepository.save(user);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return secureUrl;
    }

    @Override
    public void initiatePasswordReset(AppUser user) {
        String token = tokenService.getPasswordResetToken(user);
        notificationService.sendEmail(user.getEmail(), "Password reset",
                "<b>Hello " + StringUtils.defaultIfBlank(user.getName(), " ") + ",</b> <br/>" +
                        "Did you forget your password and would like to get new credentials? <br/>" +
                        "Please reset your password by clicking the link below. <br/> " +
                        passwordResetUrl + token +
                        "<br/><br/> This token will expire in " + jwtExpiry / 60 + " minutes");
    }

    @Transactional
    @Override
    public void resetPassword(Long userId, String password) {
        if (userId == null) {
            throw new IllegalArgumentException("UserId cannot be null");
        }
        if (password == null || password.isBlank()) {
            throw new IllegalArgumentException("Password cannot be empty");
        }
        AppUser user = userRepository.findActiveById(userId)
                .orElseThrow(() -> new PesatoneNotFoundException("User not found"));
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    @Override
    @Cacheable(value = "creator", key = "#reference")
    public UserPojo getCreator(String reference) {
        log.info("Getting user info from DB: {}", reference);
        AppUser user;
        if (StringUtils.isNumeric(reference)) {
            user = userRepository.findActiveByIdAndRole(Long.valueOf(reference), RoleEnum.CREATOR)
                    .orElseThrow(() -> new PesatoneNotFoundException("Creator not found"));
        } else {
            user = userRepository.findActiveByUserNameAndRole(reference, RoleEnum.CREATOR)
                    .orElseThrow(() -> new PesatoneNotFoundException("Creator not found"));
        }
        return getUserDetails(user);
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
    // Cache only the default (no query) list: same result for everyone, hammered on every search-open.
    @Cacheable(value = "creatorSearch", key = "#filter.pageNumber + '-' + #filter.pageSize",
            condition = "#filter.name == null or #filter.name.trim().isEmpty()")
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
            // typed search: verified first, then alphabetical
            blazeQuery.orderBy(qAppUser.verified.desc().nullsLast(), qAppUser.username.asc(), qAppUser.id.desc());
        } else {
            // default (no query): trending = most successful gifts in the last 7 days, verified as tie-break
            QPaymentTransaction qTxn = QPaymentTransaction.paymentTransaction;
            Date since = Date.from(Instant.now().minus(7, ChronoUnit.DAYS));
            Expression<Long> recentGifts = JPAExpressions.select(qTxn.count())
                    .from(qTxn)
                    .where(qTxn.creator.eq(qAppUser)
                            .and(qTxn.paymentStatus.eq(PaymentStatusEnum.SUCCESSFUL))
                            .and(qTxn.createdAt.after(since)));
            blazeQuery.orderBy(new OrderSpecifier<>(Order.DESC, recentGifts),
                    qAppUser.verified.desc().nullsLast(), qAppUser.id.desc());
        }

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

        // copy out of Blaze's PagedList into a plain serializable list so the result can be cached
        return new QueryResultPojo<>(new ArrayList<>(pagedList), filter.getPageNumber(),
                filter.getPageSize(), pagedList.getTotalPages());
    }

    @Transactional
    @Override
    @CacheEvict(value = "creator", key = "T(java.lang.String).valueOf(#creator.id)")
    public AppUser approveCreatorAccount(AppUser creator, ApprovalStatusEnum approvalStatus) {
        if (creator.getRole().equals(RoleEnum.CREATOR)) {
            creator.setApprovalStatus(approvalStatus);
            if (approvalStatus.equals(ApprovalStatusEnum.APPROVED)) {
                creator.setVerified(true);
            }
            userRepository.save(creator);
            walletService.getOrCreateWallet(creator, CurrencyEnum.RWF);
            return creator;
        }
        throw new PesatoneException("Invalid user type");
    }

    @Transactional
    @Override
    @CacheEvict(value = "creator", key = "T(java.lang.String).valueOf(#user.id)")
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
            link.setLink(linkDto.getLink());
            links.add(link);
        }
        socialLinkRepository.saveAll(links);
    }
}
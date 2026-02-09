package com.pesatone.api.repository;

import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.SocialLink;
import com.pesatone.api.model.enumeration.SocialPlatformEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SocialLinkRepository extends JpaRepository<SocialLink,Long> {
    List<SocialLink> findByAppUser(AppUser appUser);

    Optional<SocialLink> findByAppUserAndPlatform(AppUser user, SocialPlatformEnum platform);
}

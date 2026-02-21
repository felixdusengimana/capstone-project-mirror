package com.pesatone.api.repository;

import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.OneTimePassword;
import com.pesatone.api.model.entity.SocialLink;
import com.pesatone.api.model.enumeration.OtpTypeEnum;
import com.pesatone.api.model.enumeration.SocialPlatformEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface OtpRepository extends JpaRepository<OneTimePassword,Long> {
    @Query("select a from OneTimePassword a where a.appUser= ?1 and a.type=?2 and a.expired is false")
    List<OneTimePassword> findUnexpiredByAppUserAndType(AppUser user, OtpTypeEnum type);

    @Query("select a from OneTimePassword a where a.appUser= ?1 and a.otp =?2 and a.type= ?3 and a.expired is false and a.expiryAt > ?4 ")
    List<OneTimePassword> findByAppUserAndOtpAndTypeAndExpiryAtAfter(AppUser user,String otp, OtpTypeEnum type, Date expiryAt);
}

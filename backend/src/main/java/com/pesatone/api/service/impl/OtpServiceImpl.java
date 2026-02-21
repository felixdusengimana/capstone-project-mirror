package com.pesatone.api.service.impl;

import com.pesatone.api.exception.PesatoneException;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.OneTimePassword;
import com.pesatone.api.model.enumeration.NotificationChannelEnum;
import com.pesatone.api.model.enumeration.OtpTypeEnum;
import com.pesatone.api.repository.AppUserRepository;
import com.pesatone.api.repository.OtpRepository;
import com.pesatone.api.service.NotificationService;
import com.pesatone.api.service.OtpService;
import com.pesatone.api.util.AppUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.TemporalUnit;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {
    private final OtpRepository otpRepository;
    private final AppUserRepository userRepository;
    private final NotificationService notificationService;
    @Value("${application.otpExpiry}")
    Integer otpExpiry;

    @Override
    @Transactional
    public void sendOtp(AppUser recipient, OtpTypeEnum type) {
        invalidateOtp(recipient, type);
        OneTimePassword otp = createOtp(recipient, type);
        sendOtpNotification(recipient, otp);
    }

    @Override
    @Transactional
    public boolean verifyOtp(AppUser recipient, OtpTypeEnum type, String otp) {
        Date currentTime = Date.from(Instant.now());
        List<OneTimePassword> validOtps = otpRepository.findByAppUserAndOtpAndTypeAndExpiryAtAfter(recipient, otp, type, currentTime);
        if (validOtps.isEmpty()) {
            throw new PesatoneException("Sorry, we could not validate your request. Kindly try again");
        }
        expireOtps(validOtps);

        switch (type) {
            case PHONE_VERIFICATION: {
                recipient.setPhoneNumberVerified(true);
                userRepository.save(recipient);
                return true;
            }
            case EMAIL_VERIFICATION: {
                recipient.setEmailVerified(true);
                userRepository.save(recipient);
                return true;
            }
            case PAYOUT: {
                return true;
            }
            default:
                return false;
        }
    }

    private void invalidateOtp(AppUser recipient, OtpTypeEnum type) {
        List<OneTimePassword> validOtps = otpRepository.findUnexpiredByAppUserAndType(recipient, type);
        expireOtps(validOtps);
    }

    private OneTimePassword createOtp(AppUser recipient, OtpTypeEnum type) {
        OneTimePassword otp = new OneTimePassword();
        otp.setAppUser(recipient);
        otp.setCreatedAt(Date.from(Instant.now()));
        otp.setExpiryAt(Date.from(Instant.now().plusSeconds(otpExpiry)));
        otp.setOtp(AppUtil.generateOtp());
        otp.setExpired(false);
        otp.setType(type);
        setNotificationChannel(type, otp);
        return otpRepository.save(otp);
    }

    private void setNotificationChannel(OtpTypeEnum type, OneTimePassword otp) {
        if (Objects.requireNonNull(type) == OtpTypeEnum.PHONE_VERIFICATION) {
            otp.setNotificationChannel(NotificationChannelEnum.SMS);
        } else {
            otp.setNotificationChannel(NotificationChannelEnum.EMAIL);
        }
    }

    private void expireOtps(List<OneTimePassword> validOtps) {
        if (!validOtps.isEmpty()) {
            validOtps.forEach(otp -> otp.setExpired(true));
            otpRepository.saveAll(validOtps);
        }
    }

    private void sendOtpNotification(AppUser user, OneTimePassword otp) {
        switch (otp.getType()) {
            case PHONE_VERIFICATION: {
                break;
            }
            case EMAIL_VERIFICATION: {
                notificationService.sendEmail(user.getEmail(), "Verify your email",
                        "<b>Hello " + StringUtils.defaultIfBlank(user.getName(), " ") + ",</b> <br/>" +
                                "Welcome onboard. <br/>" +
                                "Pesatone is here to give your fans an easy way of appreciating your talent and craft. <br/><br/>" +
                                "Use this one time password: <b>" + otp.getOtp() + "</b> to verify your account. <br/><br/>"+
                                "Your one time password would expire in <b>" + otpExpiry/60 + "</b> minutes. <br/>");
                break;
            }
            case PAYOUT: {
                notificationService.sendEmail(user.getEmail(), "Approve your withdrawal",
                        "<b>Hello " + StringUtils.defaultIfBlank(user.getName(), " ") + ",</b> <br/>" +
                                "We are thrilled to share some exciting news with you. You have made money using Pesatone!. <br/>" +
                                "Use this one time password: <b>" + otp.getOtp() + "</b> to approve your withdrawal. <br/>");
                break;
            }
            default:
                break;
        }
    }
}

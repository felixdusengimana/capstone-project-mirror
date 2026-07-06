package com.pesatone.api.service;

import com.pesatone.api.exception.PesatoneException;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.OneTimePassword;
import com.pesatone.api.model.enumeration.OtpTypeEnum;
import com.pesatone.api.repository.AppUserRepository;
import com.pesatone.api.repository.OtpRepository;
import com.pesatone.api.service.impl.OtpServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.Instant;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OtpServiceImplTest {

    @Mock private OtpRepository otpRepository;
    @Mock private AppUserRepository userRepository;
    @Mock private NotificationService notificationService;

    @InjectMocks private OtpServiceImpl otpService;

    private AppUser user;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(otpService, "otpExpiry", 600);
        user = new AppUser();
        user.setEmail("felix@example.com");
        user.setEmailVerified(false);
    }

    @Test
    void cooldown_blocksSecondSend_noEmail() {
        OneTimePassword recent = new OneTimePassword();
        recent.setCreatedAt(Date.from(Instant.now())); // just sent
        when(otpRepository.findUnexpiredByAppUserAndType(user, OtpTypeEnum.EMAIL_VERIFICATION))
                .thenReturn(List.of(recent));

        otpService.sendOtp(user, OtpTypeEnum.EMAIL_VERIFICATION);

        verify(notificationService, never()).sendEmail(anyString(), anyString(), anyString());
        verify(otpRepository, never()).save(any());
    }

    @Test
    void sendsEmail_whenNoRecentOtp() {
        when(otpRepository.findUnexpiredByAppUserAndType(user, OtpTypeEnum.EMAIL_VERIFICATION))
                .thenReturn(List.of()); // nothing recent
        when(otpRepository.save(any(OneTimePassword.class))).thenAnswer(i -> i.getArgument(0));

        otpService.sendOtp(user, OtpTypeEnum.EMAIL_VERIFICATION);

        verify(otpRepository).save(any(OneTimePassword.class));
        verify(notificationService).sendEmail(eq("felix@example.com"), anyString(), anyString());
    }

    @Test
    void throws_whenEmailAlreadyVerified() {
        user.setEmailVerified(true);

        assertThrows(PesatoneException.class,
                () -> otpService.sendOtp(user, OtpTypeEnum.EMAIL_VERIFICATION));
        verify(notificationService, never()).sendEmail(anyString(), anyString(), anyString());
    }
}

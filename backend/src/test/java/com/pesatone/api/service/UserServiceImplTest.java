package com.pesatone.api.service;

import com.pesatone.api.exception.PesatoneNotFoundException;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.enumeration.StatusEnum;
import com.pesatone.api.repository.AppUserRepository;
import com.pesatone.api.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private AppUserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    private AppUser testUser;

    @BeforeEach
    void setUp() {
        testUser = new AppUser();
        testUser.setId(1L);
        testUser.setEmail("test@example.com");
        testUser.setPassword("password123");
        testUser.setStatus(StatusEnum.ACTIVE);
    }

    @Test
    void resetPassword_withValidUser_shouldResetPasswordAndSaveChanges() {
        String newPassword = "newPassword456";

        when(userRepository.findActiveById(testUser.getId()))
                .thenReturn(Optional.of(testUser));

        when(passwordEncoder.encode(newPassword))
                .thenReturn("encodedNewPassword");

        userService.resetPassword(testUser.getId(), newPassword);

        verify(userRepository).findActiveById(testUser.getId());
        verify(passwordEncoder).encode(newPassword);

        verify(userRepository).save(argThat(user ->
                user.getPassword().equals("encodedNewPassword")
        ));

        verifyNoMoreInteractions(userRepository, passwordEncoder);
    }

    @Test
    void resetPassword_withNonexistentUser_shouldThrowPesatoneNotFoundException() {
        Long nonexistentUserId = 999L;

        when(userRepository.findActiveById(nonexistentUserId))
                .thenReturn(Optional.empty());

        assertThrows(PesatoneNotFoundException.class, () ->
                userService.resetPassword(nonexistentUserId, "newPassword")
        );

        verify(userRepository).findActiveById(nonexistentUserId);
        verify(userRepository, never()).save(any());
        verifyNoMoreInteractions(userRepository);
    }

    @Test
    void resetPassword_withNullUserId_shouldThrowIllegalArgumentException() {
        assertThrows(IllegalArgumentException.class, () ->
                userService.resetPassword(null, "newPassword")
        );

        verifyNoInteractions(userRepository, passwordEncoder);
    }

    @Test
    void resetPassword_withEmptyPassword_shouldThrowIllegalArgumentException() {
        assertThrows(IllegalArgumentException.class, () ->
                userService.resetPassword(testUser.getId(), "")
        );

        verifyNoInteractions(userRepository, passwordEncoder);
    }
}
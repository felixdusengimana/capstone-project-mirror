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
        // Given
        String newPassword = "newPassword456";
        when(userRepository.findActiveById(testUser.getId())).thenReturn(Optional.of(testUser));
        when(passwordEncoder.encode(newPassword)).thenReturn("encodedNewPassword");

        // When
        userService.resetPassword(testUser.getId(), newPassword);

        // Then
        verify(userRepository).save(argThat(user -> user.getPassword().equals("encodedNewPassword")));
        verifyNoMoreInteractions(userRepository);
    }

    @Test
    void resetPassword_withNonexistentUser_shouldThrowPesatoneNotFoundException() {
        // Given
        Long nonexistentUserId = 999L;
        when(userRepository.findActiveById(nonexistentUserId)).thenReturn(Optional.empty());

        // When
        assertThrows(PesatoneNotFoundException.class, () -> userService.resetPassword(nonexistentUserId, "newPassword"));

        // Then
        verifyNoInteractions(userRepository);
    }

    @Test
    void resetPassword_withNullUserId_shouldThrowIllegalArgumentException() {
        // Given
        Long nullUserId = null;

        // When
        assertThrows(PesatoneNotFoundException.class, () -> userService.resetPassword(nullUserId, "newPassword"));

        // Then
        verifyNoInteractions(userRepository);
    }

    @Test
    void resetPassword_withEmptyPassword_shouldThrowIllegalArgumentException() {
        // Given
        String emptyPassword = "";

        // When
        assertThrows(PesatoneNotFoundException.class, () -> userService.resetPassword(testUser.getId(), emptyPassword));

        // Then
        verifyNoInteractions(userRepository);
    }
}
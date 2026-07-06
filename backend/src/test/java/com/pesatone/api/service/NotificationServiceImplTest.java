package com.pesatone.api.service;

import com.pesatone.api.service.impl.NotificationServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

class NotificationServiceImplTest {

    // sendEmail swallows all failures by design, so this exercises the send path
    // deterministically (a bad key/offline just hits the catch block).
    @Test
    void sendEmail_neverThrows() {
        NotificationServiceImpl service = new NotificationServiceImpl();
        ReflectionTestUtils.setField(service, "resendApiKey", "re_test_key");
        ReflectionTestUtils.setField(service, "mailSender", "noreply@pesatone.com");
        ReflectionTestUtils.setField(service, "brandName", "Pesatone");
        assertDoesNotThrow(() -> service.sendEmail("to@example.com", "Subject", "<p>Hi</p>"));
    }
}

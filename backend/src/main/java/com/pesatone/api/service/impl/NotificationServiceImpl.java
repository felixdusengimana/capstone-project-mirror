package com.pesatone.api.service.impl;

import com.pesatone.api.service.NotificationService;
import com.resend.Resend;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class NotificationServiceImpl implements NotificationService {

    @Value("${application.resend.api-key}")
    private String resendApiKey;

    @Value("${application.mail.sender}")
    private String mailSender;

    @Override
    public void sendEmail(String recipient, String subject, String message) {
        try {
            Resend resend = new Resend(resendApiKey);

            CreateEmailOptions params = CreateEmailOptions.builder()
                    .from(mailSender)
                    .to(recipient)
                    .subject(subject)
                    .html(message)
                    .build();

            CreateEmailResponse response = resend.emails().send(params);
            log.info("Email sent successfully to: {} with ID: {}", recipient, response.getId());

        } catch (Exception e) {
            log.error("Error sending email to {}: {}", recipient, e.getMessage(), e);
        }
    }
}

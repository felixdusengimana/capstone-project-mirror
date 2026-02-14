package com.pesatone.api.service.impl;

import com.mailjet.client.MailjetClient;
import com.mailjet.client.errors.MailjetException;
import com.mailjet.client.transactional.SendContact;
import com.mailjet.client.transactional.SendEmailsRequest;
import com.mailjet.client.transactional.TrackOpens;
import com.mailjet.client.transactional.TransactionalEmail;
import com.pesatone.api.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final MailjetClient mailjetClient;

    @Value("${application.mail.sender}")
    private String mailSender;

    @Override
    public void sendEmail(String recipient, String subject, String message) {
        TransactionalEmail transactionalEmail = TransactionalEmail
                .builder()
                .to(new SendContact(recipient))
                .from(new SendContact(mailSender, "Pesatone Team"))
                .htmlPart(message)
                .subject(subject)
                .trackOpens(TrackOpens.ENABLED)
                .customID(UUID.randomUUID().toString())
                .build();

        SendEmailsRequest request = SendEmailsRequest
                .builder()
                .message(transactionalEmail)
                .build();

        try {
            request.sendWith(mailjetClient);
        } catch (MailjetException e) {
            e.printStackTrace();
        }
    }
}

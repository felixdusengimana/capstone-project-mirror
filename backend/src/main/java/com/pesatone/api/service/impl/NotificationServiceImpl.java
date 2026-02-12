package com.pesatone.api.service.impl;

import com.mailgun.api.v3.MailgunMessagesApi;
import com.mailgun.model.message.Message;
import com.pesatone.api.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final MailgunMessagesApi messagesApi;

    @Value("${application.mailgun.domain}")
    private String mailGunDomain;

    @Value("${application.mail.sender}")
    private String mailSender;

    @Override
    public void sendEmail(String recipient, String subject, String message) {
        Message msg = Message.builder()
                .from(mailSender)
                .to(recipient)
                .subject(subject)
                .text(message)
                .build();

        messagesApi.sendMessageAsync(mailGunDomain, msg);
    }
}

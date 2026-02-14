package com.pesatone.api.service;

public interface NotificationService {
    void sendEmail(String recipient, String subject, String message);
}

package com.pesatone.api.service;

import java.util.List;

public interface NotificationService {
    void sendEmail(String recipient, String subject, String message);
}

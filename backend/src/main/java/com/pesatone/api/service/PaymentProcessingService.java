package com.pesatone.api.service;

import com.pesatone.api.model.dto.PaymentDto;
import com.pesatone.api.model.dto.PayoutDto;
import com.pesatone.api.model.entity.PaymentTransaction;
import com.pesatone.api.model.entity.Payout;

public interface PaymentProcessingService {
    PaymentTransaction processPayment(PaymentTransaction transaction, PaymentDto paymentDto);
    Payout processPayout(Payout payout, PayoutDto payoutDto);
}

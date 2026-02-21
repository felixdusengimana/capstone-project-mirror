package com.pesatone.api.service.impl;

import com.pesatone.api.model.dto.PayoutRequestDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.Payout;
import com.pesatone.api.repository.PayoutRepository;
import com.pesatone.api.service.PayoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PayoutServiceImpl implements PayoutService {
    private final PayoutRepository payloadRepository;

    @Transactional
    @Override
    public Payout initiatePayout(AppUser creator, PayoutRequestDto dto) {
        validatePayoutRequest(dto);
        Payout payout = new Payout();
        payout.setAmount(dto.getAmount());
//        payout.setCurrency(dto.getCurrency());
        payout.setPaymentChannel(dto.getPaymentChannel());
        payout.setCreator(creator);
        return null;
    }

    private void validatePayoutRequest(PayoutRequestDto dto) {
        // check balance
        // check payout amount restriction
        // check pending payouts
        // check if user has setup and verified payout mode

    }
}

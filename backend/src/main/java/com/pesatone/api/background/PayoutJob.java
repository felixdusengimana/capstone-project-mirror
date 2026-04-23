package com.pesatone.api.background;

import com.pesatone.api.model.entity.Payout;
import com.pesatone.api.service.PayoutService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class PayoutJob {
   private final PayoutService payoutService;
   private final

    // @Scheduled(fixedDelayString = "PT10M", initialDelayString = "PT10S")
    void processMobileMoneyPayout() {
        log.info("*** Payout processing Job running at {} ***", new Date());
        try {
            List<Payout> eligiblePayouts = payoutService.fetchEligibleMomoPayouts(20);
            log.info("*** Processing Payout: " + eligiblePayouts.size());
            eligiblePayouts.forEach(payoutService::initiateMomoPayout);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}

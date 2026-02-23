package com.pesatone.api.service;

import com.pesatone.api.model.dto.PayoutRequestDto;
import com.pesatone.api.model.entity.AppUser;
import com.pesatone.api.model.entity.PaymentTransaction;
import com.pesatone.api.model.entity.Payout;
import com.pesatone.api.model.search.filter.PayoutSearchFilter;
import com.pesatone.api.model.search.response.PayoutSearchResponse;
import com.pesatone.api.model.search.response.QueryResultPojo;
import reactor.core.publisher.Mono;

import java.util.List;

public interface PayoutService {
    Payout getByReference(String reference);

    Payout initiatePayout(AppUser creator, PayoutRequestDto dto);

    QueryResultPojo<PayoutSearchResponse> searchPayouts(PayoutSearchFilter filter);

    List<Payout> fetchEligibleMomoPayouts(int batchSize);

    Mono<Payout> checkMomoPayoutStatus(Payout transaction);

    Mono<Payout> initiateMomoPayout(Payout transaction);
}

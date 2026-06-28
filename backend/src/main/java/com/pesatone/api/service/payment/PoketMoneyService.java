package com.pesatone.api.service.payment;

import com.pesatone.api.configuration.properties.PaymentConfig;
import com.pesatone.api.model.dto.poketmoney.PoketMoneyPaymentRequest;
import com.pesatone.api.model.dto.poketmoney.PoketMoneyPaymentResponse;
import com.pesatone.api.model.dto.poketmoney.PoketMoneyStatusCheckRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

@Service
@RequiredArgsConstructor
@Slf4j
public class PoketMoneyService {
    private final PaymentConfig paymentConfig;
    private final HttpClient httpClient;

    /**
     * Initiates a payment collection request with Poket Money API
     * POST /api/v1/payments with Bearer token authentication
     */
    public Mono<PoketMoneyPaymentResponse> initiatePayment(PoketMoneyPaymentRequest request) {
        return postRequest("/api/v1/payments", request, "payment");
    }

    /**
     * Initiates a payout request with Poket Money API.
     * This keeps mobile-money payouts on the same provider by default.
     */
    public Mono<PoketMoneyPaymentResponse> initiatePayout(PoketMoneyPaymentRequest request) {
        return postRequest("/api/v1/payouts", request, "payout");
    }

    /**
     * Checks the status of a payment transaction with Poket Money API
     * POST /api/v1/payments/check-status with Bearer token authentication
     */
    public Mono<PoketMoneyPaymentResponse> checkPaymentStatus(String externalId) {
        PoketMoneyStatusCheckRequest request = new PoketMoneyStatusCheckRequest(externalId);
        return postRequest("/api/v1/payments/check-status", request, "payment status");
    }

    /**
     * Checks the status of a payout request with Poket Money API.
     */
    public Mono<PoketMoneyPaymentResponse> checkPayoutStatus(String externalId) {
        PoketMoneyStatusCheckRequest request = new PoketMoneyStatusCheckRequest(externalId);
        return postRequest("/api/v1/payouts/check-status", request, "payout status");
    }

    private Mono<PoketMoneyPaymentResponse> postRequest(String uri, Object request, String action) {
        String externalId = request instanceof PoketMoneyPaymentRequest paymentRequest
                ? paymentRequest.getExternal_id()
                : request instanceof PoketMoneyStatusCheckRequest statusRequest
                ? statusRequest.getExternalId()
                : "unknown";

        log.info("Initiating Poket Money {} for external_id: {}", action, externalId);

        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .baseUrl(paymentConfig.getPoketMoneyBaseUrl())
                .build()
                .post()
                .uri(uri)
                .header("Authorization", "Bearer " + paymentConfig.getPoketMoneyM2mApiKey())
                .header("Content-Type", "application/json")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(PoketMoneyPaymentResponse.class)
                .doOnSuccess(response -> log.info("Poket Money {} initiated successfully: {}", action, response != null ? response.getId() : null))
                .doOnError(error -> log.error("Poket Money {} failed for {}: {}", action, externalId, error.getMessage(), error));
    }
}


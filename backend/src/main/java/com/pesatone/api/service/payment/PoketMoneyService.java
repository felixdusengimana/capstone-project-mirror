package com.pesatone.api.service.payment;

import com.pesatone.api.configuration.properties.PaymentConfig;
import com.pesatone.api.model.dto.poketmoney.PoketMoneyCallbackPayload;
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
        log.info("Initiating Poket Money payment for external_id: {}", request.getExternal_id());
        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .baseUrl(paymentConfig.getPoketMoneyBaseUrl())
                .build()
                .post()
                .uri("/api/v1/payments")
                .header("Authorization", "Bearer " + paymentConfig.getPoketMoneyM2mApiKey())
                .header("Content-Type", "application/json")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(PoketMoneyPaymentResponse.class)
                .doOnSuccess(response -> log.info("Poket Money payment initiated successfully: {}", response.getId()))
                .doOnError(error -> log.error("Poket Money payment initiation failed: {}", error.getMessage(), error));
    }

    /**
     * Checks the status of a payment transaction with Poket Money API
     * POST /api/v1/payments/check-status with Bearer token authentication
     */
    public Mono<PoketMoneyPaymentResponse> checkPaymentStatus(String externalId) {
        log.info("Checking Poket Money payment status for external_id: {}", externalId);
        PoketMoneyStatusCheckRequest request = new PoketMoneyStatusCheckRequest(externalId);

        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .baseUrl(paymentConfig.getPoketMoneyBaseUrl())
                .build()
                .post()
                .uri("/api/v1/payments/check-status")
                .header("Authorization", "Bearer " + paymentConfig.getPoketMoneyM2mApiKey())
                .header("Content-Type", "application/json")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(PoketMoneyPaymentResponse.class)
                .doOnSuccess(response -> log.info("Poket Money payment status checked: {}, status: {}", externalId, response.getStatus()))
                .doOnError(error -> log.error("Poket Money status check failed for {}: {}", externalId, error.getMessage(), error));
    }
}


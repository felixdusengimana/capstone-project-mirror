package com.pesatone.api.service.payment;

import com.pesatone.api.configuration.properties.PaymentConfig;
import com.pesatone.api.model.dto.fdi.FdiAuthData;
import com.pesatone.api.model.dto.fdi.FdiAuthRequest;
import com.pesatone.api.model.dto.fdi.FdiAuthResponse;
import com.pesatone.api.model.dto.fdi.FdiRequest;
import com.pesatone.api.model.dto.fdi.FdiResponse;
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
public class FdiService {
        private final PaymentConfig paymentConfig;
        private final HttpClient httpClient;
        private FdiAuthData auth;

        public Mono<FdiResponse> getTransactionDetail(String transactionReference) {
                refreshToken();
                return WebClient.builder()
                                .clientConnector(new ReactorClientHttpConnector(httpClient))
                                .baseUrl(paymentConfig.getFdiTransactionDetailUrl().replace("trxRef", transactionReference))
                                .build()
                                .get()
                                .header("Authorization", "Bearer " + auth.getToken())
                                .retrieve()
                                .bodyToMono(FdiResponse.class);
        }

        public Mono<FdiResponse> initiateTransaction(FdiRequest requestDto, Boolean isPayment) {
                refreshToken();
                return WebClient.builder()
                                .clientConnector(new ReactorClientHttpConnector(httpClient))
                                .baseUrl(isPayment ? paymentConfig.getFdiPaymentUrl() : paymentConfig.getFdiPayoutUrl())
                                .build()
                                .post()
                                .header("Authorization", "Bearer " + auth.getToken())
                                .bodyValue(requestDto)
                                .retrieve()
                                .bodyToMono(FdiResponse.class);
        }

        public void refreshToken() {
                if (auth == null || auth.hasExpired()) {
                        FdiAuthResponse response = WebClient.builder()
                                        .clientConnector(new ReactorClientHttpConnector(httpClient))
                                        .baseUrl(paymentConfig.getFdiAuthUrl())
                                        .build()
                                        .post()
                                        .bodyValue(new FdiAuthRequest(paymentConfig.getFdiAppId(),
                                                        paymentConfig.getFdiSecret()))
                                        .retrieve()
                                        .bodyToMono(FdiAuthResponse.class)
                                        .block();
                        auth = response.getData();
                }
        }
}

package com.pesatone.api.service.payment;

import com.google.gson.Gson;
import com.pesatone.api.configuration.properties.PaymentConfig;
import com.pesatone.api.model.dto.flw.FlwPayoutRequestDto;
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
public class FlutterWaveService {
    private final PaymentConfig paymentConfig;
    private final HttpClient httpClient;
    private final Gson gson;

    public Mono<String> getTransactionDetail(String transactionReference){
        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .baseUrl(paymentConfig.getFlwTransactionDetailUrl())
                .build()
                .get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("tx_ref", transactionReference)
                        .build())
                .header("Authorization", "Bearer "+ paymentConfig.getFlwSecretKey())
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> getTransferDetail(String transactionReference){
        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .baseUrl(paymentConfig.getFlwTransferUrl())
                .build()
                .get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("reference", transactionReference)
                        .build())
                .header("Authorization", "Bearer "+ paymentConfig.getFlwSecretKey())
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> initiateMomoTransfer(FlwPayoutRequestDto requestDto){
        log.info("Payout Request: {}:{}",paymentConfig.getFlwTransferUrl(), gson.toJson(requestDto));
        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .baseUrl(paymentConfig.getFlwTransferUrl())
                .build()
                .post()
                .header("Authorization", "Bearer "+ paymentConfig.getFlwSecretKey())
                .bodyValue(requestDto)
                .retrieve()
                .bodyToMono(String.class)
                .doOnSuccess(response -> log.info("Payout Response: {}", response))
                .doOnError(error -> log.error("Payout Error: {}", error.getMessage()));
    }
}

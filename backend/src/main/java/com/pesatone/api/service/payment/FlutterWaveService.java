package com.pesatone.api.service.payment;

import com.pesatone.api.configuration.properties.PaymentConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

@Service
@RequiredArgsConstructor
public class FlutterWaveService {
    private final PaymentConfig paymentConfig;
    private final HttpClient httpClient;

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

    public Mono<String> getPayoutDetail(String transactionReference){
        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .baseUrl(paymentConfig.getFlwTransferDetailUrl())
                .build()
                .get()
                .uri(uriBuilder -> uriBuilder
                        .pathSegment(transactionReference)
                        .build())
                .header("Authorization", "Bearer "+ paymentConfig.getFlwSecretKey())
                .retrieve()
                .bodyToMono(String.class);
    }
}

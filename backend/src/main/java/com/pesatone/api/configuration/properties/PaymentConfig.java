package com.pesatone.api.configuration.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "application.payment")
public class PaymentConfig {
    private String flwVerifyHash;
    private String flwSecretKey;
    private String flwTransactionDetailUrl;
    private String flwTransferUrl;
    private Integer transactionFeePercentage;
    private String fdiAccountId;
    private String fdiAppId;
    private String fdiSecret;
    private String fdiPayoutUrl;
    private String fdiPaymentUrl;
    private String fdiTransactionDetailUrl;
    private String fdiAuthUrl;
    private String fdiPaymentCallbackUrl;
    private String fdiPayoutCallbackUrl;
    private String poketMoneyBaseUrl;
    private String poketMoneyM2mApiKey;
    private String poketMoneyCallbackUrlPayment;
    private String poketMoneyCallbackUrlPayout;
}

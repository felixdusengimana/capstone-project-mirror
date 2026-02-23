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
}

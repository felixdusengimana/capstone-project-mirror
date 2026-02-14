package com.pesatone.api.model.enumeration;

import lombok.Getter;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Getter
public enum PaymentProviderEnum {
    FLUTTERWAVE(PaymentChannelEnum.MOBILE_MONEY,
            PaymentChannelEnum.CARD,
            PaymentChannelEnum.BANK);

    private final Set<PaymentChannelEnum> channels;

    PaymentProviderEnum(PaymentChannelEnum... channels) {
        this.channels = new HashSet<>(Arrays.asList(channels));
    }
}

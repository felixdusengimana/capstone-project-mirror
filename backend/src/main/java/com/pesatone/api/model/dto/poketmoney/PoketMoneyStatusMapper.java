package com.pesatone.api.model.dto.poketmoney;

import com.pesatone.api.model.enumeration.PaymentStatusEnum;
import lombok.experimental.UtilityClass;

@UtilityClass
public class PoketMoneyStatusMapper {

    public PaymentStatusEnum mapStatus(String poketMoneyStatus) {
        if (poketMoneyStatus == null) {
            return PaymentStatusEnum.PENDING;
        }

        return switch (poketMoneyStatus.toLowerCase()) {
            case "success" -> PaymentStatusEnum.SUCCESSFUL;
            case "failed" -> PaymentStatusEnum.FAILED;
            case "pending" -> PaymentStatusEnum.PENDING;
            default -> PaymentStatusEnum.PENDING;
        };
    }
}


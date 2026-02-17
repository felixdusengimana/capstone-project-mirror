package com.pesatone.api.model.pojo;

import java.math.BigDecimal;

public record DashboardPojo(BigDecimal totalAmountReceived,
                            Integer totalTransactions,
                            Integer totalSupporters,
                            BigDecimal biggestSupport) {
}

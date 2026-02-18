package com.pesatone.api.model.pojo;

import java.math.BigDecimal;

public record DashboardPojo(BigDecimal totalAmountReceived,
                            Integer totalTransactions,
                            long totalSupporters,
                            BigDecimal biggestSupport) {
}

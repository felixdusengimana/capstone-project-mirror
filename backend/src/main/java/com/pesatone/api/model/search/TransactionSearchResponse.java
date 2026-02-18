package com.pesatone.api.model.search;

import java.math.BigDecimal;
import java.util.Date;

public record TransactionSearchResponse(Long id,
                                        BigDecimal amount,
                                        BigDecimal transactionFee,
                                        String transactionReference,
                                        Date paidAt,
                                        String note) {
}

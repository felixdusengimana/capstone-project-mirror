package com.pesatone.api.model.search.filter;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class TransactionSearchFilter extends PaginatedSearchFilter{
    @Parameter(name = "startDate",
            description = "Start date of transaction",
            example = "2024-04-20")
    private String startDate;

    @Parameter(name = "endDate",
            description = "End date of transaction",
            example = "2024-04-26")
    private String endDate;

    @Parameter(name = "donorName",
            description = "Donor/Fan's name",
            example = "Alex")
    private String donorName;
}

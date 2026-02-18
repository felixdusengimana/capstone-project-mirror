package com.pesatone.api.model.search;

import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PaginatedSearchFilter {
    @Parameter(name = "pageNumber",
            description = "Page number of your search. This defaults to 0",
            example = "0")
    @Min(value = 0,message = "Page number cannot be less than Zero(0)")
    private Integer pageNumber = 0;

    @Parameter(name = "pageSize",
            description = "Number of records to be returned. This defaults to 10." +
                    "You can only fetch a maximum of 100 records at once",
            example = "10")
    @Max(value = 100,message = "Page size cannot exceed 100")
    @Min(value = 1,message = "Page size cannot be less than One(1)")
    private Integer pageSize = 10;

    public Integer getOffset(){
        return  Math.max(0, (this.pageNumber - 1) * this.pageSize);
    }
}

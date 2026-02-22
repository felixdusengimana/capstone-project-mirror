package com.pesatone.api.model.search.filter;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CreatorSearchFilter extends PaginatedSearchFilter{
    @Parameter(name = "name",
            description = "Creators username or name",
            example = "0")
    private String name;
}

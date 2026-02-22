package com.pesatone.api.model.search.response;

import jakarta.annotation.Nullable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
public final class QueryResultPojo<T> implements Serializable {
    @Serial
    private static final long serialVersionUID = -4591506147471300909L;
    private final Integer pageNumber;
    private final Integer pageSize;
    private final Integer totalPages;
    private final List<T> results;

    public QueryResultPojo(List<T> results, @Nullable Integer pageNumber, @Nullable Integer pageSize, Integer totalPages) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.totalPages = totalPages;
        this.results = results;
    }

    public List<T> getResults() {
        return this.results;
    }

    public long getTotalPages() {
        return this.totalPages;
    }

    public boolean isEmpty() {
        return this.results.isEmpty();
    }

}

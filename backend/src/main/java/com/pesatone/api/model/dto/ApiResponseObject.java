package com.pesatone.api.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;

@Data
public class ApiResponseObject <T> implements Serializable {
    @Schema(description = "A message for the response")
    private String message;

    @Schema(description = "Shows whether or not the request was successful")
    private boolean success;

    @Schema(description = "Response data object")
    private T data;

    public ApiResponseObject(String message, boolean success, T data) {
        this.data = data;
        this.success = success;
        this.message = message;
    }

    public ApiResponseObject(String message, boolean success) {
        this.success = success;
        this.message = message;
    }

}
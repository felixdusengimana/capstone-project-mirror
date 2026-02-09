package com.pesatone.api.exception;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.pesatone.api.model.dto.ApiResponseObject;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.MethodNotAllowedException;

import java.util.Date;


@ControllerAdvice
@Slf4j
public class ErrorControllerAdvice {

    private static final String GENERIC_ERROR_MESSAGE = "Something went wrong! Please try again.";

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handle(IllegalArgumentException e) {
        log.info(e.getMessage(), e);
        String errorMessage;
        if (e.getCause() != null) {
            errorMessage = e.getCause().getMessage();
        } else {
            errorMessage = e.getMessage();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponseObject<>(errorMessage,false));
    }



    @ExceptionHandler({ConstraintViolationException.class})
    public ResponseEntity<Object> handleConstraintViolation(
            ConstraintViolationException ex) {
        log.info(ex.getMessage());
        String customizedErrorMessage = "";
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
           customizedErrorMessage = String.format("Invalid %s", violation.getPropertyPath().toString());
        }

        return new ResponseEntity<>(new ApiResponseObject<>(customizedErrorMessage,false), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<Object> handleMethodArgumentException(MethodArgumentNotValidException ex) {
        log.info(ex.getMessage());
        return new ResponseEntity<>(new ApiResponseObject<>("handleMethodArgumentException",false), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler({BindException.class})
    public ResponseEntity<Object> handleBindingException(BindException ex) {
        log.info(ex.getMessage());
//        for (FieldError violation : ex.getBindingResult().getFieldErrors()) {
//            String customizedErrorMessage = String.format("Invalid %s", violation.getField());
//            if(StringUtils.isNotBlank(violation.getDefaultMessage())){
//                customizedErrorMessage = violation.getDefaultMessage();
//            }
//            errors.add(new ApiErrorObject(PesatoneExceptionConstant.BAD_DATA.name(), customizedErrorMessage, violation.getField()));
//        }

        return new ResponseEntity<>(new ApiResponseObject<>("handleBindingException",false), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Object> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        log.info(e.getMessage());

        String field = "invalid_field";
//
//        if (e.getCause() instanceof InvalidFormatException) {
//            InvalidFormatException ifx = (InvalidFormatException) e.getCause();
//            if (ifx.getTargetType()!=null && (ifx.getTargetType().isEnum() || ifx.getTargetType().equals(Date.class))) {
//                field = ifx.getPath().get(ifx.getPath().size()-1).getFieldName();
//            }
//        }

        String errorMessage = "Invalid value for "+field;

         return new ResponseEntity<>(new ApiResponseObject<>(errorMessage,false), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> handle(RuntimeException e) throws JsonProcessingException {
        log.error(e.getMessage(),e);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponseObject<>(GENERIC_ERROR_MESSAGE,false));
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<Object> handle(MethodNotAllowedException e) {
        log.error(e.getMessage(),e);
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(new ApiResponseObject<>(GENERIC_ERROR_MESSAGE,false));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handle(Exception e) {
        log.error(e.getMessage(),e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponseObject<>(GENERIC_ERROR_MESSAGE,false));
    }
}

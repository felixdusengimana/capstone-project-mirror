package com.pesatone.api.exception;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.pesatone.api.model.dto.ApiResponseObject;
import org.springframework.dao.DataIntegrityViolationException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.server.MethodNotAllowedException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.Date;
import java.util.stream.Collectors;


@ControllerAdvice
@Slf4j
public class ErrorControllerAdvice {

    private static final String GENERIC_ERROR_MESSAGE = "Something went wrong! Please try again.";

    @ExceptionHandler(MultipartException.class)
    public ResponseEntity<Object> handleMultipartException(MultipartException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponseObject<>("Please select a file",false));
    }

    @ExceptionHandler({IllegalArgumentException.class, PesatoneException.class})
    public ResponseEntity<Object> handleBadRequest(Exception e) {
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

        String errorMessage = ex.getConstraintViolations()
                .stream()
                .map(ConstraintViolation::getMessage)
                .collect(Collectors.joining(", "));

        return new ResponseEntity<>(new ApiResponseObject<>(errorMessage,false), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<Object> handleMethodArgumentException(MethodArgumentNotValidException ex) {

        String errorMessage = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining(", "));

        return new ResponseEntity<>(new ApiResponseObject<>(errorMessage,false), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler({BindException.class})
    public ResponseEntity<Object> handleBindingException(BindException ex) {
        String errorMessage = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.joining(", "));
        return new ResponseEntity<>(new ApiResponseObject<>(errorMessage,false), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Object> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        log.info(e.getMessage());
        String field = "invalid_field";

        if (e.getCause() instanceof InvalidFormatException) {
            InvalidFormatException ifx = (InvalidFormatException) e.getCause();
            if (ifx.getTargetType()!=null && (ifx.getTargetType().isEnum() || ifx.getTargetType().equals(Date.class))) {
                field = ifx.getPath().get(ifx.getPath().size()-1).getFieldName();
            }
        }

        String errorMessage = "Invalid value for "+field;

         return new ResponseEntity<>(new ApiResponseObject<>(errorMessage,false), new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({PesatoneAuthenticationException.class, BadCredentialsException.class})
    public ResponseEntity<Object> handleAuthenticationException(Exception e) {
        log.info("AUTHORIZATION_EXCEPTION {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponseObject<>("Sorry, your credentials are invalid or the account is not active",false));
    }

    @ExceptionHandler({AccessDeniedException.class})
    public ResponseEntity<Object> handleAccessDeniedException(AccessDeniedException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponseObject<>("Sorry, your don't have the required permissions",false));
    }

    @ExceptionHandler(PesatoneNotFoundException.class)
    public ResponseEntity<Object> handle(PesatoneNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponseObject<>(e.getMessage(),false));
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<Object> handle(NoResourceFoundException e) {
        log.error("No resource exception {}",e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponseObject<>("Page not found",false));
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Object> handleDataIntegrityViolation(DataIntegrityViolationException e) {
        log.warn("DATA_INTEGRITY_VIOLATION {}", e.getMostSpecificCause().getMessage());
        String message = "This record already exists";
        String cause = e.getMostSpecificCause().getMessage();
        if (cause != null) {
            String lower = cause.toLowerCase();
            if (lower.contains("username")) {
                message = "This username is already taken";
            } else if (lower.contains("email")) {
                message = "This email is already in use";
            }
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponseObject<>(message, false));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> handle(RuntimeException e) {
        log.error("RUNTIME_EXCEPTION",e);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponseObject<>(GENERIC_ERROR_MESSAGE,false));
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<Object> handle(MethodNotAllowedException e) {
        log.error("Method not allowed {}",e.getMessage());
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(new ApiResponseObject<>("Http method not supported",false));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handle(Exception e) {
        log.error("SYSTEM_EXCEPTION",e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponseObject<>(GENERIC_ERROR_MESSAGE,false));
    }
}

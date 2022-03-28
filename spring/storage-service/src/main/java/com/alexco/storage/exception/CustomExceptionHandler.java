package com.alexco.storage.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(SubscriptionNameAlreadyExistsException.class)
    public final ResponseEntity<ApiExceptionResponse> handleSubscriptionNameException(SubscriptionNameAlreadyExistsException ex, WebRequest request) {
        ApiExceptionResponse apiExceptionResponse = new ApiExceptionResponse(new Date(), ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(apiExceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(SubscriptionInfoNotFoundException.class)
    public final ResponseEntity<SubscriptionInfoNotFoundResponse> subscriptionInfoNotFoundException(SubscriptionInfoNotFoundException ex, WebRequest request) {
        SubscriptionInfoNotFoundResponse apiExceptionResponse = new SubscriptionInfoNotFoundResponse(ex.getMessage());
        return new ResponseEntity<>(apiExceptionResponse, HttpStatus.BAD_REQUEST);
    }
}

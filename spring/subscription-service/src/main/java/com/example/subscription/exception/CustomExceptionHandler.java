package com.example.subscription.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class CustomExceptionHandler {


    @ExceptionHandler(EntityNotFoundException.class)
    public final ResponseEntity<EntityNotFoundExceptionResponse> handleSubscriptionNameException(EntityNotFoundException ex, WebRequest request) {
        EntityNotFoundExceptionResponse apiExceptionResponse = new EntityNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(apiExceptionResponse, HttpStatus.BAD_REQUEST);
    }
}

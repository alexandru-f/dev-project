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
        EntityNotFoundExceptionResponse apiResponse = new EntityNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public final ResponseEntity<EmailAlreadyExistsExceptionResponse> handleEmailAlreadyExistsException(EmailAlreadyExistsException ex, WebRequest request) {
        EmailAlreadyExistsExceptionResponse apiResponse = new EmailAlreadyExistsExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CompanyNameAlreadyExistsException.class)
    public final ResponseEntity<CompanyNameAlreadyExistsExceptionResponse> handleEmailAlreadyExistsException(CompanyNameAlreadyExistsException ex, WebRequest request) {
        CompanyNameAlreadyExistsExceptionResponse apiResponse = new CompanyNameAlreadyExistsExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }
}

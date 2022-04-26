package com.example.subscription.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class InvalidJwtException extends RuntimeException{

    public InvalidJwtException(String exception) {
        super(exception);
    }
}
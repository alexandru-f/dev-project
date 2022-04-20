package com.example.subscription.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)

public class SubscriptionInfoNotFoundException extends RuntimeException {

    public SubscriptionInfoNotFoundException(String message) {
        super(message);
    }
}

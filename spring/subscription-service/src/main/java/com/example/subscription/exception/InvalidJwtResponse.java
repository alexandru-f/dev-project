package com.example.subscription.exception;

public class InvalidJwtResponse {

    private String errorMessage;

    public InvalidJwtResponse(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
package com.example.subscription.exception;

public class BadCredentialsCustomResponse {
    public String badCredentials;

    public BadCredentialsCustomResponse(String badCredentials) {
        this.badCredentials = badCredentials;
    }

    public String getBadCredentials() {
        return badCredentials;
    }

    public void setBadCredentials(String badCredentials) {
        this.badCredentials = badCredentials;
    }
}
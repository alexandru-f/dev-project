package com.alexco.storage.exception;

public class SubscriptionInfoNotFoundResponse {

    private String subscriptionInfoNotFound;

    public SubscriptionInfoNotFoundResponse(String subscriptionInfoNotFound) {
        this.subscriptionInfoNotFound = subscriptionInfoNotFound;
    }

    public String getSubscriptionInfoNotFound() {
        return subscriptionInfoNotFound;
    }

    public void setSubscriptionInfoNotFound(String subscriptionInfoNotFound) {
        this.subscriptionInfoNotFound = subscriptionInfoNotFound;
    }
}
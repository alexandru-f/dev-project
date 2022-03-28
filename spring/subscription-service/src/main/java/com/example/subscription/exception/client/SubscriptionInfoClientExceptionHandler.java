package com.example.subscription.exception.client;

import com.example.subscription.exception.SubscriptionInfoNotFoundException;
import com.example.subscription.feign.FeignHttpExceptionHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import feign.Response;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
public class SubscriptionInfoClientExceptionHandler implements FeignHttpExceptionHandler {
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Exception handle(Response response) {
        if (response.status() == HttpStatus.BAD_REQUEST.value()) {
            try {
                String responseBody = new String(response.body().asInputStream().readAllBytes(), StandardCharsets.UTF_8);
                ErrorResponse errorResponse = objectMapper.readValue(responseBody, ErrorResponse.class);
                return new SubscriptionInfoNotFoundException(errorResponse.getSubscriptionInfoNotFound());
            } catch (IOException e) {
                throw new RuntimeException("Error while deserializing the response body");
            }
        }
        return null;
    }
}

package com.example.subscription.exception;


import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class EntityNotFoundExceptionResponse {

    private String entityNotFound;

}

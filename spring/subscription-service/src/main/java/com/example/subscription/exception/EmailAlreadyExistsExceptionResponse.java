package com.example.subscription.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class EmailAlreadyExistsExceptionResponse {

    private String emailAlreadyExists;
}

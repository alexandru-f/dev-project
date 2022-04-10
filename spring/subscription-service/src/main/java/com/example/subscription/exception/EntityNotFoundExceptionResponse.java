package com.example.subscription.exception;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Data
public class EntityNotFoundExceptionResponse {

    private String entityException;

}

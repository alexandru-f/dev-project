package com.example.subscription.payload;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class LoginRequest {

    @NotBlank(message = "{email.not.empty}")
    @Email(message = "{wrong.email.format}")
    private String email;

    @NotBlank(message = "{password.not.empty}")
    private String password;

}
package com.example.subscription.payload;

import com.example.subscription.custominterface.LoginAndRegisterPassword;
import lombok.Data;

import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class LoginRequest implements LoginAndRegisterPassword {

    @NotBlank(message = "{email.not.empty}")
    @Email(message = "{wrong.email.format}")
    private String email;

    @NotBlank(message = "{password.not.empty}")
    private String password;

    @Transient
    private String confirmPassword;


}
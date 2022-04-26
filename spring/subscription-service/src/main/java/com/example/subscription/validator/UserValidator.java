package com.example.subscription.validator;

import com.example.subscription.DTO.RegisterCompanyDTO;
import com.example.subscription.custominterface.LoginAndRegisterPassword;
import com.example.subscription.payload.LoginRequest;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return RegisterCompanyDTO.class.equals(clazz) || LoginRequest.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {

        LoginAndRegisterPassword loginOrRegister = null;

        if (target instanceof RegisterCompanyDTO) {
            loginOrRegister = (RegisterCompanyDTO) target;
        } else {
            loginOrRegister = (LoginRequest) target;
        }

        if (loginOrRegister.getPassword().length() < 6) {
            errors.rejectValue("password", "Length", "Password must be at least 6 characters long");
        }

        if (!loginOrRegister.getPassword().equals(loginOrRegister.getConfirmPassword())) {
            errors.rejectValue("confirmPassword", "Match", "Passwords must match");
        }
    }
}

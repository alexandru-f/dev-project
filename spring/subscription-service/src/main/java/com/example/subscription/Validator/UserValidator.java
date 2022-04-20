package com.example.subscription.Validator;

import com.example.subscription.DTO.RegisterCompanyDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return RegisterCompanyDTO.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        RegisterCompanyDTO registerCompanyDTO = (RegisterCompanyDTO) target;

        if (registerCompanyDTO.getPassword().length() <= 6) {
            errors.rejectValue("password", "Length", "Password must be at least 6 characters long");
        }

        if (!registerCompanyDTO.getPassword().equals(registerCompanyDTO.getConfirmPassword())) {
            errors.rejectValue("confirmPassword", "Match", "Passwords must match");
        }
    }
}

package com.example.subscription.DTO;

import com.example.subscription.interfaces.UserRegistration;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Builder
public class RegisterCompanyDTO implements UserRegistration {

    @NotBlank(message = "{firstName.not.empty}")
    private final String firstName;
    @NotBlank(message = "{lastName.not.empty}")
    private final String lastName;
    @NotBlank(message = "{email.not.empty}")
    @Email(message = "{wrong.email.format}")
    private final String email;
    @Column(unique=true, length = 100)
    @NotBlank(message = "{companyName.not.empty}")
    private final String companyName;
    @NotBlank(message = "{password.not.empty}")
    private final String password;
    @Transient
    private final String confirmPassword;


    @Override
    public String getFirstName() {
        return firstName;
    }

    @Override
    public String getLastName() {
        return lastName;
    }

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public String getCompanyName() {
        return companyName;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getConfirmPassword() {
        return confirmPassword;
    }
}

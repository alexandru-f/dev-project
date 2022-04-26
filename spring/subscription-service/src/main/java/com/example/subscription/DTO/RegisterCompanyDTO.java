package com.example.subscription.DTO;

import com.example.subscription.custominterface.LoginAndRegisterPassword;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterCompanyDTO implements LoginAndRegisterPassword {

    @NotBlank(message = "{firstName.not.empty}")
    private String firstName;
    @NotBlank(message = "{lastName.not.empty}")
    private String lastName;
    @NotBlank(message = "{email.not.empty}")
    @Email(message = "{wrong.email.format}")
    private String email;
    @Column(unique=true, length = 100)
    @NotBlank(message = "{companyName.not.empty}")
    private String companyName;
    @NotBlank(message = "{password.not.empty}")
    private String password;
    @Transient
    private String confirmPassword;
}

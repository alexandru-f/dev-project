package com.example.subscription.controller;

import com.example.subscription.Validator.UserValidator;
import com.example.subscription.DTO.RegisterCompanyDTO;
import com.example.subscription.service.UserService;
import com.example.subscription.utility.ValidateErrors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin
public class UserController {

    private final ValidateErrors validateErrors;
    private final UserValidator userValidator;
    private final UserService userService;

    public UserController(ValidateErrors validateErrors, UserValidator userValidator, UserService userService) {
        this.validateErrors = validateErrors;
        this.userValidator = userValidator;
        this.userService = userService;
    }

    @PostMapping("/company/signup")
    ResponseEntity<?> signUpUser (@Valid @RequestBody RegisterCompanyDTO registerCompanyDTO,
                                  BindingResult bindingResult) {
        //Validate passwords
        userValidator.validate(registerCompanyDTO, bindingResult);
        ResponseEntity<?> errors = validateErrors.validate(bindingResult);
        if (errors != null) return errors;
        userService.manageNewSubscription(registerCompanyDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}

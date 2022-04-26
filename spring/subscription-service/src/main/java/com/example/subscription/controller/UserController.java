package com.example.subscription.controller;

import com.example.subscription.exception.BadCredentialsCustomException;
import com.example.subscription.payload.LoginRequest;
import com.example.subscription.security.UserDetailsServiceImpl;
import com.example.subscription.utility.JwtUtil;
import com.example.subscription.validator.UserValidator;
import com.example.subscription.DTO.RegisterCompanyDTO;
import com.example.subscription.service.UserService;
import com.example.subscription.utility.ValidateErrors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;


import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin
public class UserController {

    private final ValidateErrors validateErrors;
    private final UserValidator userValidator;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;
    private final JwtUtil jwtUtil;

    public UserController(ValidateErrors validateErrors, UserValidator userValidator, UserService userService,
                          AuthenticationManager authenticationManager, UserDetailsServiceImpl userDetailsService, JwtUtil jwtUtil) {
        this.validateErrors = validateErrors;
        this.userValidator = userValidator;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
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

    @PostMapping("/login")
    ResponseEntity<?> loginUser(@RequestBody @Valid LoginRequest loginRequest, BindingResult bindingResult) {

        //Validate passwords
        userValidator.validate(loginRequest, bindingResult);
        ResponseEntity<?> errors = validateErrors.validate(bindingResult);
        if (errors != null) return errors;
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
            Map<String, String> tokens = jwtUtil.generateTokens(userDetails);
            return new ResponseEntity<>(tokens, HttpStatus.OK);
        } catch (BadCredentialsException badCredentialsException) {
            throw new BadCredentialsCustomException("Bad Credentials");
        }
    }

    @GetMapping("/token/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        Map<String, String> token = userService.generateAccessTokenFromRefreshToken(authorizationHeader);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }
}

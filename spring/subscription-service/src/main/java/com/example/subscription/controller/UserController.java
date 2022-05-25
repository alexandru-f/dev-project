package com.example.subscription.controller;

import com.example.subscription.DTO.UserResponse;
import com.example.subscription.domain.Membership;
import com.example.subscription.domain.User;
import com.example.subscription.exception.BadCredentialsCustomException;
import com.example.subscription.payload.LoginRequest;
import com.example.subscription.security.UserDetailsServiceImpl;
import com.example.subscription.utility.CookieUtil;
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


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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
    private final CookieUtil cookieUtil;

    public UserController(ValidateErrors validateErrors, UserValidator userValidator, UserService userService,
                          AuthenticationManager authenticationManager, UserDetailsServiceImpl userDetailsService, JwtUtil jwtUtil, CookieUtil cookieUtil) {
        this.validateErrors = validateErrors;
        this.userValidator = userValidator;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.cookieUtil = cookieUtil;
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
    ResponseEntity<?> loginUser(@RequestBody @Valid LoginRequest loginRequest, BindingResult bindingResult, HttpServletResponse response) {

        ResponseEntity<?> errors = validateErrors.validate(bindingResult);
        if (errors != null) return errors;
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
            Map<String, String> tokens = jwtUtil.generateTokens(userDetails);
            //Set cookies for authentication
            Cookie refreshCookie = cookieUtil.createCookie("refreshToken", tokens.get("refreshToken"), 4, true);
            Cookie accessCookie = cookieUtil.createCookie("accessToken", tokens.get("accessToken"), 2, true);
            Cookie isLoggedInCookie = cookieUtil.createCookie("loggedIn", "true", 2, false);
            response.addCookie(refreshCookie);
            response.addCookie(accessCookie);
            response.addCookie(isLoggedInCookie);
            Map<String, String> accessToken = new HashMap<>();
            accessToken.put("accessToken", tokens.get("accessToken"));
            return new ResponseEntity<>(accessToken, HttpStatus.OK);
        } catch (BadCredentialsException badCredentialsException) {
            throw new BadCredentialsCustomException("Bad Credentials");
        }
    }

    @GetMapping("/getUserInfo")
    ResponseEntity<?> getUserInfo(Principal principal) {
        Optional<UserResponse> userResponse = userService.getUserInfo(principal.getName());
        if (userResponse.isPresent()) {
            return new ResponseEntity<>(userResponse, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/token/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String cookieValue = cookieUtil.getCookieValue("refreshToken").orElse(null);
        if (cookieValue != null) {
            String accessToken = userService.generateAccessTokenFromRefreshToken(cookieValue);
            Cookie isLoggedInCookie = cookieUtil.createCookie("loggedIn", "true", 2, false);
            Cookie accessCookie = cookieUtil.createCookie("accessToken", accessToken, 2, true);
            response.addCookie(isLoggedInCookie);
            response.addCookie(accessCookie);
            return new ResponseEntity<>(Map.of("accessToken", accessToken), HttpStatus.OK);
        }
        return new ResponseEntity<>(Map.of("error", "Can't find cookies"), HttpStatus.FORBIDDEN);
    }
}

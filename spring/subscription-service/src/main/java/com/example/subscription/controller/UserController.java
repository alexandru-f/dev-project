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


import javax.servlet.ServletException;
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
    ResponseEntity<?> signUpUser(@Valid @RequestBody RegisterCompanyDTO registerCompanyDTO,
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
            Map<String, Cookie> authCookies = cookieUtil.getAuthCookies(tokens.get("refreshToken"), tokens.get("accessToken"));
            response.addCookie(authCookies.get("refreshCookie"));
            response.addCookie(authCookies.get("accessCookie"));
            response.addCookie(authCookies.get("isLoggedInCookie"));
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
        if (cookieValue == null)
            return new ResponseEntity<>(Map.of("error", "Refresh token not present"), HttpStatus.FORBIDDEN);

        String accessToken = userService.generateAccessTokenFromRefreshToken(cookieValue);
        Cookie isLoggedInCookie = cookieUtil.createCookie("loggedIn", "true", 60, false);
        Cookie accessCookie = cookieUtil.createCookie("accessToken", accessToken, 60, true);
        response.addCookie(isLoggedInCookie);
        response.addCookie(accessCookie);
        return new ResponseEntity<>(Map.of("accessToken", accessToken), HttpStatus.OK);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request, HttpServletResponse response) {
        try {
            request.logout();
            Cookie accessCookie = cookieUtil.createCookie("accessToken", null, 0, true);
            Cookie refreshCookie = cookieUtil.createCookie("refreshToken", null, 0, true);
            Cookie isLoggedInCookie = cookieUtil.createCookie("loggedIn", null, 0, false);
            response.addCookie(accessCookie);
            response.addCookie(refreshCookie);
            response.addCookie(isLoggedInCookie);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (ServletException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }
}

package com.example.subscription.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.subscription.DTO.RegisterCompanyDTO;
import com.example.subscription.DTO.UserResponse;
import com.example.subscription.domain.Company;
import com.example.subscription.domain.Membership;
import com.example.subscription.domain.Role;
import com.example.subscription.domain.User;
import com.example.subscription.exception.CompanyNameAlreadyExistsException;
import com.example.subscription.exception.EmailAlreadyExistsException;
import com.example.subscription.exception.InvalidJwtException;
import com.example.subscription.interfaces.UserRegistration;
import com.example.subscription.repository.CompanyRepository;
import com.example.subscription.repository.MembershipRepository;
import com.example.subscription.repository.UserRepository;
import com.example.subscription.utility.JwtUtil;
import com.example.subscription.utility.TokensUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.security.Principal;
import java.util.*;

@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final MembershipRepository membershipRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final TokensUtil tokensUtil;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, CompanyRepository companyRepository, MembershipRepository membershipRepository,
                       BCryptPasswordEncoder bCryptPasswordEncoder, TokensUtil tokensUtil, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.membershipRepository = membershipRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.tokensUtil = tokensUtil;
        this.jwtUtil = jwtUtil;
    }

    public void manageNewSubscription(RegisterCompanyDTO registerCompanyDTO) {

        //create company
        Company company = createCompany(registerCompanyDTO);

        //create user
        User user = createUser(registerCompanyDTO);

        //create membership
        Membership membership = createMembership();

        user.setCompany(company);
        company.setCreatedBy(user);
        company.setMembership(membership);
        membership.setCompany(company);
        userRepository.save(user);
    }

    public Optional<UserResponse> getUserInfo(String userEmail) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isPresent()) {
            User userFullInfo = userOptional.get();
            UserResponse userResponse = UserResponse.builder()
                    .firstName(userFullInfo.getFirstName())
                    .lastName(userFullInfo.getLastName())
                    .email(userFullInfo.getEmail())
                    .company(userFullInfo.getCompany().getName())
                    .roles(userFullInfo.getRoles())
                    .build();
            return Optional.of(userResponse);
        }
        return Optional.empty();
    }
    public String generateAccessTokenFromRefreshToken(String token) {
            try {
                DecodedJWT decodedJWT = tokensUtil.createDecodedJWT(token);
                String username = decodedJWT.getSubject();
                Optional<User> userOptional = getUserByEmail(username);
                User user = userOptional.orElseThrow(() ->  new EmailAlreadyExistsException("Email already exists"));
                return jwtUtil.generateAccessToken(user);
            } catch(Exception exception) {
                throw new InvalidJwtException(exception.getMessage());
            }
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email.toLowerCase());
    }

//    public List<User> getAllUsers() {
//        return null;
////        Principal currentUser = SecurityContextHolder.getContext().getAuthentication();
//        Optional<Membership> userOptional = membershipRepository.getCompleteUserInfo(currentUser.getName());
//        if (userOptional.isPresent()) {
//            Membership userInfo = userOptional.get();
//
//            Optional<List<User>> users = membershipRepository.getAllUsersByCompany(userInfo.getCompany());
//
//            if (users.isPresent()) {
//                return users.get();
//            }
//        }
//        return new ArrayList<>();
//    }

    private Company createCompany(RegisterCompanyDTO registerCompanyDTO) {
        Company company = Company.builder()
                .name(registerCompanyDTO.getCompanyName())
                .build();
        throwIfCompanyNameAlreadyExists(company.getName());

        return company;
    }

    private Membership createMembership() {
        return Membership.builder().isActive(true).build();

    }
    private User createUser(UserRegistration registerCompanyDTO) {
        User user = User.builder()
                .email(registerCompanyDTO.getEmail().toLowerCase())
                .password(bCryptPasswordEncoder.encode(registerCompanyDTO.getPassword()))
                .firstName(registerCompanyDTO.getFirstName())
                .lastName(registerCompanyDTO.getLastName())
                .roles(new ArrayList<>(List.of(Role.ROLE_ADMINISTRATOR)))
                .build();

        if (isEmailAlreadyInUse(user.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists");
        }
        return userRepository.save(user);
    }

    private boolean isEmailAlreadyInUse(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.isPresent();
    }

    private void throwIfCompanyNameAlreadyExists(String email) {
        if (companyRepository.existsByNameIgnoreCase(email)) {
            throw new CompanyNameAlreadyExistsException("Company name already exists");
        }
    }

}

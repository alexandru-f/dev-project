package com.example.subscription.service;

import com.example.subscription.DTO.RegisterCompanyDTO;
import com.example.subscription.domain.Company;
import com.example.subscription.domain.Membership;
import com.example.subscription.domain.Role;
import com.example.subscription.domain.User;
import com.example.subscription.exception.CompanyNameAlreadyExistsException;
import com.example.subscription.exception.EmailAlreadyExistsException;
import com.example.subscription.repository.CompanyRepository;
import com.example.subscription.repository.MembershipRepository;
import com.example.subscription.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final MembershipRepository membershipRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository, CompanyRepository companyRepository, MembershipRepository membershipRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.membershipRepository = membershipRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public void manageNewSubscription(RegisterCompanyDTO registerCompanyDTO) {

        //create user
        User user = createUser(registerCompanyDTO);

        //create company
        Company company = createCompany(registerCompanyDTO);

        //create membership
        createMembership(user, company);
    }

    private Company createCompany(RegisterCompanyDTO registerCompanyDTO) {
        Company company = Company.builder()
                .name(registerCompanyDTO.getCompanyName())
                .masterEmail(registerCompanyDTO.getEmail().toLowerCase())
                .isActive(true)
                .build();

        throwIfCompanyNameAlreadyExists(company.getName());
        return companyRepository.save(company);
    }

    private void createMembership(User user, Company company) {
        Membership membership = Membership.builder()
                .user(user)
                .company(company)
                .build();

        membershipRepository.save(membership);

    }
    private User createUser(RegisterCompanyDTO registerCompanyDTO) {
        User user = User.builder()
                .email(registerCompanyDTO.getEmail().toLowerCase())
                .password(bCryptPasswordEncoder.encode(registerCompanyDTO.getPassword()))
                .firstName(registerCompanyDTO.getFirstName())
                .lastName(registerCompanyDTO.getLastName())
                .roles(List.of(Role.ROLE_ADMINISTRATOR))
                .build();

        if (isEmailAlreadyInUse(user.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists");
        }
        return userRepository.save(user);
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new EmailAlreadyExistsException("Email already exists"));
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

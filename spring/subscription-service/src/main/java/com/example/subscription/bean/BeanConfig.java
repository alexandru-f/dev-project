package com.example.subscription.bean;

import com.example.subscription.feign.SubscriptionInfoProxy;
import com.example.subscription.repository.CompanyRepository;
import com.example.subscription.repository.MembershipRepository;
import com.example.subscription.repository.UserRepository;
import com.example.subscription.service.UserService;
import com.example.subscription.utility.MapperService;
import com.example.subscription.repository.SubscriptionRepository;
import com.example.subscription.service.SubscriptionService;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

@Configuration
@ComponentScan(basePackages = "com.example.subscription")
public class BeanConfig {

    @Bean
    SubscriptionService subscriptionService(SubscriptionRepository subscriptionRepository, SubscriptionInfoProxy subscriptionInfoProxy, MapperService mapperService) {
        return new SubscriptionService(subscriptionRepository, subscriptionInfoProxy, mapperService);
    }

    @Bean
    UserService userService(UserRepository userRepository, CompanyRepository companyRepository, MembershipRepository membershipRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        return new UserService(userRepository, companyRepository, membershipRepository, bCryptPasswordEncoder);
    }

    @Bean
    public MessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasename("classpath:messages");
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }

    @Bean
    public LocalValidatorFactoryBean validator(MessageSource messageSource) {
        LocalValidatorFactoryBean bean = new LocalValidatorFactoryBean();
        bean.setValidationMessageSource(messageSource);
        return bean;
    }

    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

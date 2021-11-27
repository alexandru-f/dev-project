package com.alexco.storage.bean;

import com.alexco.storage.Repository.SubscriptionInfoRepository;
import com.alexco.storage.service.SubscriptionService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "com.alexco.storage")
public class Config {

    @Bean
    public SubscriptionService subscriptionService(SubscriptionInfoRepository subscriptionInfoRepository) {
        return new SubscriptionService(subscriptionInfoRepository);
    }
}

package com.example.subscription;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;



@Configuration
public class ApiGatewayConfiguration {

    @Bean
    public RouteLocator gatewayRouter(RouteLocatorBuilder builder) {
        return builder
                .routes()
                .route(p -> p.path("/api/v1/storage/**").uri("lb://storage-service"))
                .route(p -> p.path("/api/v1/**").uri("lb://subscription-service"))
                .build();
    }

}

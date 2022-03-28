package com.example.subscription.utility;

import com.example.subscription.DTO.FullSubscriptionInfoDTO;
import com.example.subscription.DTO.SubscriptionDTO;
import com.example.subscription.DTO.SubscriptionInfoDTO;
import com.example.subscription.DTO.SubscriptionInfoShortDTO;
import com.example.subscription.domain.Subscription;
import org.springframework.stereotype.Component;

@Component
public class MapperService {

    public SubscriptionInfoDTO mapToSubscriptionInfoDTO(SubscriptionDTO subscriptionDTO) {
        return SubscriptionInfoDTO.builder()
                .name(subscriptionDTO.getSubscriptionName())
                .path("")
                .category("user-input")
                .build();
    }

    public FullSubscriptionInfoDTO mapToFullSubscriptionInfoDTO(Subscription subscription, SubscriptionInfoDTO subscriptionInfo) {
        return FullSubscriptionInfoDTO.builder()
                .id(subscription.getId())
                .subscriptionName(subscriptionInfo.getName())
                .path(subscriptionInfo.getPath())
                .currency(subscription.getCurrency())
                .price(subscription.getPrice())
                .status(subscription.isStatus())
                .payingDueDate(subscription.getPayingDueDate())
                .createdAt(subscription.getCreatedAt())
                .updatedAt(subscription.getUpdatedAt())
                .build();
    }

    public Subscription mapToSubscription(SubscriptionDTO subscriptionDTO, SubscriptionInfoShortDTO subscriptionInfoShortDTO) {
        return Subscription.builder()
                .subscriptionId(subscriptionInfoShortDTO.getId())
                .currency(subscriptionDTO.getCurrency())
                .price(subscriptionDTO.getMonthlyPrice())
                .status(subscriptionDTO.isStatus())
                .payingDueDate(subscriptionDTO.getPayingDueDate())
                .build();
    }

}

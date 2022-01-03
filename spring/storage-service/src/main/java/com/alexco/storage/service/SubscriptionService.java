package com.alexco.storage.service;

import com.alexco.storage.Repository.SubscriptionInfoRepository;
import com.alexco.storage.exception.SubscriptionNameAlreadyExistsException;
import com.alexco.storage.model.SubscriptionInfo;

public class SubscriptionService {

    private final SubscriptionInfoRepository subscriptionInfoRepository;

    public SubscriptionService(SubscriptionInfoRepository subscriptionInfoRepository) {
        this.subscriptionInfoRepository = subscriptionInfoRepository;
    }

    public SubscriptionInfo saveSubscription(SubscriptionInfo subscriptionInfo) {
        try {
            return subscriptionInfoRepository.save(subscriptionInfo);
        } catch(Exception ex) {
            throw new SubscriptionNameAlreadyExistsException("Subscription Name Already Exists");
        }
    }

    public Iterable<SubscriptionInfo> getSubscriptionsNames(String query) {
        return subscriptionInfoRepository.findTop5ByNameContainingIgnoreCase(query);
    }

}

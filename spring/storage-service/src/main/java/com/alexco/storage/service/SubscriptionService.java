package com.alexco.storage.service;

import com.alexco.storage.Repository.SubscriptionInfoRepository;
import com.alexco.storage.exception.SubscriptionNameAlreadyExistsException;
import com.alexco.storage.model.SubscriptionInfo;

import java.util.ArrayList;
import java.util.List;

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

    public List<String> getAllSubscriptionsNames() {
        List<String> names = new ArrayList<>();
        Iterable<SubscriptionInfo> subscriptionInfoList = subscriptionInfoRepository.findAll();
        subscriptionInfoList.forEach(e -> names.add(e.getName()));
        return names;
    }

}

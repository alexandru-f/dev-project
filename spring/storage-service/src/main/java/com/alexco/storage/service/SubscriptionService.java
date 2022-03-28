package com.alexco.storage.service;

import com.alexco.storage.Repository.SubscriptionInfoRepository;
import com.alexco.storage.DTO.SubscriptionInfoShortDTO;
import com.alexco.storage.exception.SubscriptionInfoNotFoundException;
import com.alexco.storage.exception.SubscriptionNameAlreadyExistsException;
import com.alexco.storage.model.SubscriptionInfo;

import java.util.List;
import java.util.Optional;

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

    public SubscriptionInfo getSubscriptionById(long id) {
        return subscriptionInfoRepository.findById(id).orElseThrow(() -> new SubscriptionInfoNotFoundException("Subscription with id " + id + " not found"));
    }

    public List<SubscriptionInfo> getSubscriptionsById(List<Long> ids) {
        return subscriptionInfoRepository.findAllById(ids);
    }

    public SubscriptionInfoShortDTO checkAndSaveSubscription(SubscriptionInfo subscriptionInfo) {
        Optional<SubscriptionInfo> subscriptionInfoOptional = subscriptionInfoRepository.findByNameIgnoreCase(subscriptionInfo.getName());
        if (subscriptionInfoOptional.isPresent()) {
            SubscriptionInfo subscriptionInfo1 = subscriptionInfoOptional.get();
            return SubscriptionInfoShortDTO.builder()
                    .id(subscriptionInfo1.getId())
                    .name(subscriptionInfo1.getName())
                    .build();
        }
        try {
            SubscriptionInfo subscriptionInfo1 = subscriptionInfoRepository.save(subscriptionInfo);
            return SubscriptionInfoShortDTO.builder()
                    .id(subscriptionInfo1.getId())
                    .name(subscriptionInfo1.getName())
                    .build();
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return null;
    }

}

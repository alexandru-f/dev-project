package com.example.subscription.service;

import com.example.subscription.DTO.FullSubscriptionInfoDTO;
import com.example.subscription.DTO.SubscriptionDTO;
import com.example.subscription.DTO.SubscriptionInfoDTO;
import com.example.subscription.DTO.SubscriptionInfoShortDTO;
import com.example.subscription.domain.Subscription;
import com.example.subscription.exception.SubscriptionInfoNotFoundException;
import com.example.subscription.feign.SubscriptionInfoProxy;
import com.example.subscription.utility.MapperService;
import com.example.subscription.repository.SubscriptionRepository;
import feign.FeignException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final SubscriptionInfoProxy subscriptionInfoProxy;
    private final MapperService mapperService;

    public SubscriptionService(SubscriptionRepository subscriptionRepository, SubscriptionInfoProxy subscriptionInfoProxy, MapperService mapperService) {
        this.subscriptionRepository = subscriptionRepository;
        this.subscriptionInfoProxy = subscriptionInfoProxy;
        this.mapperService = mapperService;
    }

    public void saveSubscription(SubscriptionDTO subscriptionDTO) {
        SubscriptionInfoDTO subscriptionInfoDTO = mapperService.mapToSubscriptionInfoDTO(subscriptionDTO);
        //Call to service microservice
        Optional<SubscriptionInfoShortDTO> subscriptionInfoShortOptional = checkOrAddSubscriptionName(subscriptionInfoDTO);

        if (subscriptionInfoShortOptional.isPresent()) {
            SubscriptionInfoShortDTO subscriptionInfoShortDTO = subscriptionInfoShortOptional.get();
            try {
                Subscription subscription = mapperService.mapToSubscription(subscriptionDTO, subscriptionInfoShortDTO);
                log.info("Saving Subscription: {} into table", subscription.toString());
                subscriptionRepository.save(subscription);
            } catch (Exception exception) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There were some problems with database. Please try again");
            }
        }
    }

    public List<FullSubscriptionInfoDTO> findAllSubscriptions() {
        List<Subscription> subscriptions = subscriptionRepository.findAll();
        Set<Long> subscriptionsId = subscriptions.stream().map(Subscription::getSubscriptionId).collect(Collectors.toSet());
        List<SubscriptionInfoDTO> subscriptionInfoDTOList = getSubscriptionInfoById(List.copyOf(subscriptionsId));
        return subscriptions.stream()
                .map(e -> {
                    long subscriptionId = e.getSubscriptionId();
                    SubscriptionInfoDTO subscriptionInfoDTO = subscriptionInfoDTOList.stream().filter(s -> s.getId() == subscriptionId).findFirst().orElse(null);
                    if (subscriptionInfoDTO != null) {
                        return mapperService.mapToFullSubscriptionInfoDTO(e, subscriptionInfoDTO);
                    }
                    return null;
                })
                .collect(Collectors.toList());
    }

    private List<SubscriptionInfoDTO> getSubscriptionInfoById(List<Long> ids) {
        try {
           return subscriptionInfoProxy.getSubscriptionById(ids);
        } catch (SubscriptionInfoNotFoundException exception) {
            log.info("Subscriptions with id " + ids.toString() + " not found in database.");
            exception.printStackTrace();
        }
        return new ArrayList<>(0);
    }


    private Optional<SubscriptionInfoShortDTO> checkOrAddSubscriptionName(SubscriptionInfoDTO subscriptionInfoDTO) {
        try {
            SubscriptionInfoShortDTO subscriptionInfoShortDTO = subscriptionInfoProxy.checkAndSaveSubscription(subscriptionInfoDTO);
            return Optional.ofNullable(subscriptionInfoShortDTO);
        } catch (FeignException feignException) {
            log.info("Exception in SubscriptionService calling storage-service/SubscriptionInfoService ", feignException.getCause());
            log.info("Status: " + feignException.status());
            return Optional.empty();
        }
    }


}

package com.example.subscription.service;

import com.example.subscription.DTO.FullSubscriptionInfoDTO;
import com.example.subscription.DTO.SubscriptionDTO;
import com.example.subscription.DTO.SubscriptionInfoDTO;
import com.example.subscription.DTO.SubscriptionInfoShortDTO;
import com.example.subscription.domain.Subscription;
import com.example.subscription.exception.EntityNotFoundException;
import com.example.subscription.exception.SubscriptionInfoNotFoundException;
import com.example.subscription.feign.SubscriptionInfoProxy;
import com.example.subscription.utility.MapperService;
import com.example.subscription.repository.SubscriptionRepository;
import feign.FeignException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
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
        List<Subscription> subscriptions = subscriptionRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        Set<Long> subscriptionsId = subscriptions.stream().map(Subscription::getSubscriptionId).collect(Collectors.toSet());
        List<SubscriptionInfoDTO> subscriptionInfoDTOList = getSubscriptionInfoById(List.copyOf(subscriptionsId));
        return subscriptions.stream()
                .map(e -> {
                    long subscriptionId = e.getSubscriptionId();
                    SubscriptionInfoDTO subscriptionInfoDTO = subscriptionInfoDTOList.stream().filter(s -> s.getId() == subscriptionId).findFirst().orElse(null);
                    if (subscriptionInfoDTO == null) return null;

                    return mapperService.mapToFullSubscriptionInfoDTO(e, subscriptionInfoDTO);
                })
                .collect(Collectors.toList());
    }

    public void updateSubscriptionById(long id, SubscriptionDTO subscriptionDTO) {
        String subscriptionName = subscriptionDTO.getSubscriptionName();
        Subscription subscription = getSubscriptionById(id);
        mapperService.mapToSubscriptionFromDTO(subscriptionDTO, subscription);
        try {
            log.info("Updating Subscription: {} ", subscription.toString());
            subscriptionRepository.save(subscription);
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "There were some problems with database. Please try again");
        }
    }

    public void deleteSubscriptionById(long id) {
        try {
            log.info("Attempt to delete subscription with id : {} ", id);
            subscriptionRepository.deleteById(id);
        } catch(EmptyResultDataAccessException exception) {
            throw new EntityNotFoundException("Id " + id + " not found");
        }
    }

    private Subscription getSubscriptionById(long id) {
            log.info("Attempt to get subscription with id : {} ", id);
            Optional<Subscription> subscriptionOptional = subscriptionRepository.findById(id);
            return subscriptionOptional.orElseThrow(() -> new EntityNotFoundException("Entity with id " + id +" not found"));
    }

    private List<SubscriptionInfoDTO> getSubscriptionInfoById(List<Long> ids) {
        try {
           return subscriptionInfoProxy.getSubscriptionsById(ids);
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

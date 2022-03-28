package com.example.subscription.feign;

import com.example.subscription.DTO.SubscriptionInfoDTO;
import com.example.subscription.DTO.SubscriptionInfoShortDTO;
import com.example.subscription.exception.SubscriptionInfoNotFoundException;
import com.example.subscription.exception.client.SubscriptionInfoClientExceptionHandler;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;
import java.util.List;

@FeignClient(name = "storage-service", url = "localhost:8081")
public interface SubscriptionInfoProxy {

    @GetMapping(value = "/api/storage/v1/subscription/searchById", produces = "application/json")
    @HandleFeignError(SubscriptionInfoClientExceptionHandler.class)
    public List<SubscriptionInfoDTO> getSubscriptionById(@RequestParam(name="id") List<Long> id) throws SubscriptionInfoNotFoundException;

    @PostMapping(value = "/api/storage/v1/subscription/checkSubscription", produces = "application/json")
    public SubscriptionInfoShortDTO checkAndSaveSubscription(@RequestBody SubscriptionInfoDTO subscriptionInfo);
}

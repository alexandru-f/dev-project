package com.alexco.storage.controller;

import com.alexco.storage.model.SubscriptionInfo;
import com.alexco.storage.service.MapValidator;
import com.alexco.storage.service.SubscriptionService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/api/storage")
public class StorageController {

    @Autowired
    MapValidator mapValidator;

    @Autowired
    SubscriptionService subscriptionService;

    @PostMapping("/new")
    public ResponseEntity<?> addSubscription(@Valid @RequestBody SubscriptionInfo subscriptionInfo, BindingResult bindingResult) {

        ResponseEntity<?> errorMap = mapValidator.validateMapError(bindingResult);
        if (errorMap != null) {
            return errorMap;
        }
        SubscriptionInfo subscriptionInfo1 = subscriptionService.saveSubscription(subscriptionInfo);
        return new ResponseEntity<SubscriptionInfo>(subscriptionInfo1, HttpStatus.CREATED);
    }

    @GetMapping(value = "/subscription/search", produces = "application/json")
    public ResponseEntity<?> getSubscriptionsNames(@RequestParam(name="q") String query) {

        Iterable<SubscriptionInfo> subscriptions = subscriptionService.getSubscriptionsNames(query);

        JSONObject names = new JSONObject();
        names.put("subscriptions", subscriptions);
        return new ResponseEntity<>(subscriptions, HttpStatus.OK);
    }
}

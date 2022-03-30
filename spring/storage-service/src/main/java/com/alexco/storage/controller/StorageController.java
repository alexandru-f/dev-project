package com.alexco.storage.controller;

import com.alexco.storage.DTO.SubscriptionInfoShortDTO;
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
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/storage/subscription")
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

    @GetMapping(value = "/search", produces = "application/json")
    public ResponseEntity<?> getSubscriptionsNames(@RequestParam(name="q") String query) {

        Iterable<SubscriptionInfo> subscriptions = subscriptionService.getSubscriptionsNames(query);

        JSONObject names = new JSONObject();
        names.put("subscriptions", subscriptions);
        return new ResponseEntity<>(subscriptions, HttpStatus.OK);
    }

//    @GetMapping(value = "/searchById", produces = "application/json")
//    public ResponseEntity<?> getSubscriptionById(@RequestParam(name="id") long id) {
//        SubscriptionInfo subscriptionInfo = subscriptionService.getSubscriptionById(id);
//        return new ResponseEntity<>(subscriptionInfo, HttpStatus.OK);
//    }

    @GetMapping(value = "/searchById", produces = "application/json")
    public ResponseEntity<?> getSubscriptionsById(@RequestParam List<Long> id) {
        System.out.println(id.toString());
        List<SubscriptionInfo> subscriptions = subscriptionService.getSubscriptionsById(id);
        System.out.println(subscriptions.toString());
        return new ResponseEntity<>(subscriptions, HttpStatus.OK);
    }

    @PostMapping(value = "/checkSubscription")
    public ResponseEntity<?> checkAndSaveSubscription(@Valid @RequestBody SubscriptionInfo subscriptionInfo) {
        SubscriptionInfoShortDTO subscriptionInfoShortDTO = subscriptionService.checkAndSaveSubscription(subscriptionInfo);
        return new ResponseEntity<>(subscriptionInfoShortDTO, HttpStatus.OK);
    }
}

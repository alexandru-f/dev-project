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
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/storage/subscription")
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

    @GetMapping(value = "/search/names", produces = "application/json")
    public ResponseEntity<?> getSubscriptionsNames() {

        List<String> retrievedNames = subscriptionService.getAllSubscriptionsNames();
        if (retrievedNames.size() == 0) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        JSONObject names = new JSONObject();
        names.put("names", retrievedNames);
        return new ResponseEntity<String>(names.toString(), HttpStatus.OK);
    }
}

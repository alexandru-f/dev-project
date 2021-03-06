package com.example.subscription.controller;

import com.example.subscription.DTO.FullSubscriptionInfoDTO;
import com.example.subscription.DTO.SubscriptionDTO;
import com.example.subscription.service.SubscriptionService;
import com.example.subscription.utility.ValidateErrors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/subscription")
@CrossOrigin
public class SubscriptionController {

    private final SubscriptionService subscriptionService;
    private final ValidateErrors validateErrors;

    public SubscriptionController(SubscriptionService subscriptionService, ValidateErrors validateErrors) {
        this.subscriptionService = subscriptionService;
        this.validateErrors = validateErrors;
    }

    @PostMapping("")
    public ResponseEntity<?> createNewSubscription(@Valid @RequestBody SubscriptionDTO subscriptionDTO,
                                                   BindingResult bindingResult) {
        ResponseEntity<?> errors = validateErrors.validate(bindingResult);
        if (errors != null) return errors;
        subscriptionService.saveSubscription(subscriptionDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<?> getAllSubscriptions() {
        List<FullSubscriptionInfoDTO> subscriptions = subscriptionService.findAllSubscriptions();
        return new ResponseEntity<>(subscriptions, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSubscriptionById(
            @PathVariable(name = "id") long id,
            @Valid @RequestBody SubscriptionDTO subscriptionDTO,
            BindingResult bindingResult) {
        ResponseEntity<?> errors = validateErrors.validate(bindingResult);
        if (errors != null) return errors;
        subscriptionService.updateSubscriptionById(id, subscriptionDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSubscriptionById(@PathVariable(name = "id") long id){
        subscriptionService.deleteSubscriptionById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

package com.example.subscription.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubscriptionInfoShortDTO {

    private long id;
    private String name;

}

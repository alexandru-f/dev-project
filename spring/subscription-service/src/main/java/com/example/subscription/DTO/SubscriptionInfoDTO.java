package com.example.subscription.DTO;


import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SubscriptionInfoDTO {

    private long id;
    private String name;
    private String path;
    private String category;

    public SubscriptionInfoDTO(long id, String name, String path, String category) {
        this.name = name;
        this.path = path;
        this.category = category;
        this.id = id;
    }
}

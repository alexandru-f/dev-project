package com.alexco.storage.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubscriptionInfoShortDTO {

    private long id;
    private String name;

}

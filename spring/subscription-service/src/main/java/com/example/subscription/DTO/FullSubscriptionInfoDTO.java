package com.example.subscription.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FullSubscriptionInfoDTO {

    private long id;
    private String subscriptionName;
    private String path;
    private String currency;
    private BigDecimal price;
    private boolean status;
    private Date payingDueDate;
    private Date createdAt;
    private Date updatedAt;


}

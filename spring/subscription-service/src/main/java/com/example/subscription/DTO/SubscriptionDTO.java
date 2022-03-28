package com.example.subscription.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubscriptionDTO {

    @NotBlank(message = "{subscriptionName.not.empty}")
    private String subscriptionName;

    @NotNull(message = "{monthlyPrice.not.empty}")
    private BigDecimal monthlyPrice;

    @NotBlank(message = "{currency.not.empty}")
    private String currency;

    @NotNull(message = "{status.not.empty}")
    private boolean status;

    private Date payingDueDate;

}

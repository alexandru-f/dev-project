package com.example.subscription.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long subscriptionId;

    private String currency;

    private BigDecimal price;

    private boolean status;

    private Date payingDueDate;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date createdAt;

    @JsonFormat(pattern = "yyyy-mm-ddd")
    private Date updatedAt;

    //To implement CreatedBy

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }
}

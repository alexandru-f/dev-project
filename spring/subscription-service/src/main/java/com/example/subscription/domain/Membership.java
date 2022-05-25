package com.example.subscription.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Membership {

    @Id
    private long id;

    @OneToOne()
    @JsonBackReference
    @MapsId
    User user;

    @ManyToOne(optional = false)
    @JsonBackReference
    @JoinColumn(name = "company_id", nullable = false)
    Company company;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

}

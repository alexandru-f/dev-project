package com.example.subscription.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Membership {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date createdAt;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date renewedAt;

    private boolean isActive;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date dueDate;

    @OneToOne(mappedBy = "membership")
    private Company company;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

}

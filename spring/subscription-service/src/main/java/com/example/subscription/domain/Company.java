package com.example.subscription.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String name;
    @Column(unique = true)
    private String masterEmail;
    private boolean isActive;

    @JsonManagedReference
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    private List<Membership> membership;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

}

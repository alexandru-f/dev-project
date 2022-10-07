package com.example.subscription.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @OneToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date createdAt;

    @OneToMany(
            mappedBy = "company",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<User> users;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinTable(name = "company_membership",
            joinColumns =
                    { @JoinColumn(name = "company_id", referencedColumnName = "id") },
            inverseJoinColumns =
                    { @JoinColumn(name = "membership_id", referencedColumnName = "id") })
    private Membership membership;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

}

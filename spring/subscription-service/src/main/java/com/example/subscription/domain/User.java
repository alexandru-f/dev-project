package com.example.subscription.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "{email.not.empty}")
    @Email(message = "{wrong.email.format}")
    @Column(unique = true, length = 100, nullable = false)
    private String email;

    @NotBlank(message = "{password.not.empty}")
    private String password;

    @Transient
    private String confirmPassword;

    @NotBlank(message = "{firstName.not.empty}")
    private String firstName;

    @NotBlank(message = "{lastName.not.empty}")
    private String lastName;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date createdAt;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date updatedAt;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, optional = false)
    private Membership membership;

    @ElementCollection
    @OrderBy
    private List<Role> roles;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }
}

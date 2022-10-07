package com.example.subscription.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
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
    private Date updatedAt;

    @NotNull
    private boolean isMasterAccount;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Company company;

    @ElementCollection
    private List<Role> roles;

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }
}

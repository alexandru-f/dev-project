package com.example.subscription.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
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

    @JsonManagedReference
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, optional = false)
    private Membership membership;

    @ElementCollection
    @OrderBy
    private List<Role> roles;

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }
}

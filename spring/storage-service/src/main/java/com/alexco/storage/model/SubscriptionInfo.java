package com.alexco.storage.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
public class SubscriptionInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(unique = true)
    @NotBlank(message = "Name must not be blank")
    private String name;

    @NotBlank(message = "Picture Url must not be blank")
    private String pictureUrl;

    public SubscriptionInfo(String name, String pictureUrl, LocalDateTime date) {
        this.name = name;
        this.pictureUrl = pictureUrl;
        this.date = date;
    }

    private LocalDateTime date;

    public SubscriptionInfo() {}

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @PrePersist
    protected void onCreate() {
        this.date = LocalDateTime.now();
    }
    @PreUpdate
    protected void onUpdate() {
        this.date = LocalDateTime.now();
    }
}

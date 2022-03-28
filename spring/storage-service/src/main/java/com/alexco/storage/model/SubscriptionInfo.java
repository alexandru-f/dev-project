package com.alexco.storage.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;


@Entity
public class SubscriptionInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String name;
    private String path;
    @JsonIgnore
    private String category;

    public SubscriptionInfo(long id, String name, String path, String category) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.category = category;
    }
    public SubscriptionInfo() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "SubscriptionInfo{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", path='" + path + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}

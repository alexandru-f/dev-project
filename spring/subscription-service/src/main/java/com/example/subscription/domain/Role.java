package com.example.subscription.domain;

import java.util.Optional;

public enum Role {
    ROLE_ADMINISTRATOR,
    ROLE_USER;

    public static Optional<Role> roleFromStr(String role){
        for (Role r: values()){
            if(r.name().equals(role)){
                return Optional.of(r);
            }
        }
        return Optional.empty();
    }
}

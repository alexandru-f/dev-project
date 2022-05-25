package com.example.subscription.repository;

import com.example.subscription.domain.Membership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MembershipRepository extends JpaRepository<Membership, Long> {
    @Query("From Membership where user.email = :userEmail")
    Optional<Membership> getCompleteUserInfo(@Param("userEmail") String userEmail);
}

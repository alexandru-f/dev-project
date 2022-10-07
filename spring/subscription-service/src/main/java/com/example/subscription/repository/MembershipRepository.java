package com.example.subscription.repository;

import com.example.subscription.domain.Company;
import com.example.subscription.domain.Membership;
import com.example.subscription.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.validation.constraints.NotEmpty;
import java.util.List;
import java.util.Optional;

public interface MembershipRepository extends JpaRepository<Membership, Long> {

}

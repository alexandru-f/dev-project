package com.alexco.storage.Repository;

import com.alexco.storage.model.SubscriptionInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubscriptionInfoRepository extends JpaRepository<SubscriptionInfo, Long> {
    public Iterable<SubscriptionInfo> findByNameContainingIgnoreCase(String name);
    public Iterable<SubscriptionInfo> findTop5ByNameContainingIgnoreCase(String name);
    public Optional<SubscriptionInfo> findByNameIgnoreCase(String name);
}

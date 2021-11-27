package com.alexco.storage.Repository;

import com.alexco.storage.model.SubscriptionInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubscriptionInfoRepository extends CrudRepository<SubscriptionInfo, Long> {
    public Iterable<SubscriptionInfo> findByNameContainingIgnoreCase(String name);
}

package com.example.tripsharing.TripSharing.repo;

import com.example.tripsharing.TripSharing.entity.TravelPartner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TravelPartnerRepository extends JpaRepository<TravelPartner,Long> {
    List<TravelPartner> findByUserIdNot(Long userId);
}

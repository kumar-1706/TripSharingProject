package com.example.tripsharing.TripSharing.repo;

import com.example.tripsharing.TripSharing.entity.TripManagement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripManagementRepository extends JpaRepository<TripManagement, Long> {
    List<TripManagement> findByUserId(Long userId);
}

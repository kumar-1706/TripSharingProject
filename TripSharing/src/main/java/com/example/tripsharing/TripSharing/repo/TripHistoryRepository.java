package com.example.tripsharing.TripSharing.repo;

import com.example.tripsharing.TripSharing.entity.TripHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TripHistoryRepository  extends JpaRepository<TripHistory,Long> {
    List<TripHistory> findByUserId(Long userId);
}

package com.example.tripsharing.TripSharing.service;

import com.example.tripsharing.TripSharing.entity.TripHistory;
import com.example.tripsharing.TripSharing.entity.TripManagement;
import com.example.tripsharing.TripSharing.entity.User;
import com.example.tripsharing.TripSharing.repo.TripHistoryRepository;
import com.example.tripsharing.TripSharing.repo.TripManagementRepository;
import com.example.tripsharing.TripSharing.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TripHistoryService {

    @Autowired
    private TripManagementRepository tripManagementRepository;
    @Autowired
    private TripHistoryRepository tripHistoryRepository;
    @Autowired
    private UserRepository userRepository;

    public void createTripHistoryForUser(Long userId) {
        List<TripManagement> userTrips = tripManagementRepository.findByUserId(userId);

        // Get the user who created the trips
        User user = userRepository.findById(userId).orElse(null);

        // Create TripHistory entries for each trip
        for (TripManagement trip : userTrips) {
            TripHistory tripHistory = new TripHistory();
            tripHistory.setStartDate(trip.getStartDate());
            tripHistory.setEndDate(trip.getEndDate());
            tripHistory.setStartingPlace(trip.getStartingPlace());
            tripHistory.setEndingPlace(trip.getEndingPlace());
            tripHistory.setUser(user); // Set the user who created the trip

            tripHistoryRepository.save(tripHistory);
        }
    }

    public TripHistory getTripHistoryById(Long id) {
        Optional<TripHistory> tripHistoryOptional = tripHistoryRepository.findById(id);
        return tripHistoryOptional.orElse(null); // or throw an exception if not found
    }



    public List<TripHistory> getTripsByUserId(Long userId) {
        return tripHistoryRepository.findByUserId(userId);
    }
}
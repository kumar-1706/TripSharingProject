package com.example.tripsharing.TripSharing.service;


import com.example.tripsharing.TripSharing.entity.TravelPartner;
import com.example.tripsharing.TripSharing.entity.TripManagement;
import com.example.tripsharing.TripSharing.entity.User;
import com.example.tripsharing.TripSharing.repo.TravelPartnerRepository;
import com.example.tripsharing.TripSharing.repo.TripManagementRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Component
@Service
public class TravelPartnerService {

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private TripManagementRepository tripManagementRepository;
    @Autowired
    private TravelPartnerRepository travelPartnerRepository;

    @Transactional
    public void createTravelPartnerForTrip(Long tripId) {
        // Retrieve trip details
        TripManagement trip = tripManagementRepository.findById(tripId).orElse(null);
        if (trip != null) {
            // Retrieve user details associated with the trip
            User user = trip.getUser();
            // Populate Travel Partner table with trip details and associated user's name
            TravelPartner travelPartner = new TravelPartner();
            travelPartner.setName(user.getFullName()); // Set name of the user
            travelPartner.setEmail(user.getEmail()); // Set other details about the person
            travelPartner.setTravellingPlan(trip.getStartingPlace() + " to " + trip.getEndingPlace() +
                    ", " + trip.getStartDate() + " to " + trip.getEndDate()); // Set travelling plan details
            travelPartner.setTripId(trip.getId());
            travelPartner.setUserId(user.getId());

            entityManager.persist(travelPartner);
        }
    }

    public List<TravelPartner> getTravelPartnersExcludingUserId(Long userId) {
        return travelPartnerRepository.findByUserIdNot(userId);
    }


}


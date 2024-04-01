package com.example.tripsharing.TripSharing.controller;

import com.example.tripsharing.TripSharing.entity.TripManagement;
import com.example.tripsharing.TripSharing.entity.User;
import com.example.tripsharing.TripSharing.exception.ResourceNotFoundException;
import com.example.tripsharing.TripSharing.repo.TripManagementRepository;
import com.example.tripsharing.TripSharing.repo.UserRepository;
import com.example.tripsharing.TripSharing.service.TravelPartnerService;
import com.example.tripsharing.TripSharing.service.TripHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController

@CrossOrigin("*")
public class TripManagementController {

    @Autowired
    private TripManagementRepository tripManagementRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TravelPartnerService travelPartnerService;

    @Autowired
    private TripHistoryService tripHistoryService;

    @PostMapping("/trips/{userId}")
    public ResponseEntity<TripManagement> createTrip(@PathVariable Long userId, @RequestBody TripManagement tripManagement) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        tripManagement.setUser(user);


        TripManagement savedTrip = tripManagementRepository.save(tripManagement);
        travelPartnerService.createTravelPartnerForTrip(savedTrip.getId());
        tripHistoryService.createTripHistoryForUser(userId);


        return new ResponseEntity<>(savedTrip, HttpStatus.CREATED);
    }

    @GetMapping("/gettripbyuserid/{userId}")
    public ResponseEntity<List<TripManagement>> getTripsByUserId(@PathVariable Long userId) {
        List<TripManagement> trips = tripManagementRepository.findByUserId(userId);
        return ResponseEntity.ok(trips);
    }


}

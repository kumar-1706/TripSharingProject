package com.example.tripsharing.TripSharing.controller;


import com.example.tripsharing.TripSharing.entity.TripHistory;
import com.example.tripsharing.TripSharing.service.TripHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/trip-history")
@CrossOrigin("*")
public class TripHistoryController {

    private final TripHistoryService tripHistoryService;


    @Autowired
    public TripHistoryController(TripHistoryService tripHistoryService) {
        this.tripHistoryService = tripHistoryService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<TripHistory> getTripHistoryById(@PathVariable("id") Long id) {
        TripHistory tripHistory = tripHistoryService.getTripHistoryById(id);
        return ResponseEntity.ok(tripHistory);
    }



    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getTripsByUserId(@PathVariable("userId") Long userId) {
        List<TripHistory> tripHistories = tripHistoryService.getTripsByUserId(userId);
        if (!tripHistories.isEmpty()) {
            return ResponseEntity.ok(tripHistories);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No trips found for user ID: " + userId);
        }
    }






}


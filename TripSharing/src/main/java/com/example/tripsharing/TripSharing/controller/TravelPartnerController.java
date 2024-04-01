package com.example.tripsharing.TripSharing.controller;
import com.example.tripsharing.TripSharing.entity.TravelPartner;
import com.example.tripsharing.TripSharing.service.TravelPartnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/travelpartners")
@CrossOrigin("*")
public class TravelPartnerController {

    private final TravelPartnerService travelPartnerService;

    @Autowired
    public TravelPartnerController(TravelPartnerService travelPartnerService) {
        this.travelPartnerService = travelPartnerService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<TravelPartner>> getTravelPartnersExcludingUserId(@PathVariable Long userId) {
        List<TravelPartner> travelPartners = travelPartnerService.getTravelPartnersExcludingUserId(userId);
        return new ResponseEntity<>(travelPartners, HttpStatus.OK);
    }
}

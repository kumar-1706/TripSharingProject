package com.example.tripsharing.TripSharing.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsRequest {

    private String fullName;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String address;
    private String pincode;
    private String profileImage;

}
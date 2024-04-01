package com.example.tripsharing.TripSharing.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProfileDTO {
    private Long userId;
    private String email;
    private String password;



}

package com.example.tripsharing.TripSharing.service;

import com.example.tripsharing.TripSharing.dto.UserDetailsRequest;
import com.example.tripsharing.TripSharing.entity.User;
import com.example.tripsharing.TripSharing.repo.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;




    public void updateUserDetails(Long userId, UserDetailsRequest userDetailsRequest) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setFullName(userDetailsRequest.getFullName());
            user.setPhoneNumber(userDetailsRequest.getPhoneNumber());
            user.setDateOfBirth(userDetailsRequest.getDateOfBirth());
            user.setAddress(userDetailsRequest.getAddress());
            user.setPincode(userDetailsRequest.getPincode());
            user.setProfileImage(userDetailsRequest.getProfileImage());
            userRepository.save(user);
        } else {
            // Handle case where user with given userId is not found
            throw new RuntimeException("User not found with id: " + userId);
        }
    }



    public void updateProfile(Long userId, String email, String password) {
        // Find the user by user ID
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            // Update the user details
            user.setEmail(email);
            user.setPassword(password);
            userRepository.save(user);
        } else {
            throw new EntityNotFoundException("User not found with ID: " + userId);
        }
    }


    public User getUserDetailsById(Long userId) {
        Optional<User> userDetailsOptional = userRepository.findById(userId);
        return userDetailsOptional.orElse(null);
    }
}
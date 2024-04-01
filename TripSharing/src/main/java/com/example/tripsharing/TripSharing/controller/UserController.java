package com.example.tripsharing.TripSharing.controller;

import com.example.tripsharing.TripSharing.dto.UpdateProfileDTO;
import com.example.tripsharing.TripSharing.dto.UserDetailsRequest;
import com.example.tripsharing.TripSharing.entity.User;
import com.example.tripsharing.TripSharing.exception.ResourceNotFoundException;
import com.example.tripsharing.TripSharing.repo.UserRepository;
import com.example.tripsharing.TripSharing.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class UserController {

    private final   UserService userService;
    private final UserRepository userRepository;

    public static String uploadDirectory=System.getProperty("user.dir") + "/src/main/webapp/images";


    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/user/signup")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        // Convert the email to lowercase
        String lowercaseEmail = user.getEmail().toLowerCase();

        // Check if the lowercase email already exists
        if (userRepository.existsByEmail(lowercaseEmail)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email already exists");
        }

        // Set the lowercase email back to the user object
        user.setEmail(lowercaseEmail);

        // Save the user
        User savedUser = userRepository.save(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginUser) {
        // Find user by email
        User user = userRepository.findByEmail(loginUser.getEmail());
        if (user == null) {
            // User not found
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        // Check if passwords match
        if (!user.getPassword().equals(loginUser.getPassword())) {
            // Passwords don't match
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        // Passwords match, login successful
        // Return user ID in the response
        return ResponseEntity.ok().body(Map.of("userId", user.getId()));
    }



    @PutMapping ("/user/update/{userId}")
    public ResponseEntity<String> updateUserDetails(
            @PathVariable("userId") Long userId,
            @ModelAttribute UserDetailsRequest userDetailsRequest,
            @RequestParam("image") MultipartFile file) throws IOException {

        // Save the image file
        String originalFilename = file.getOriginalFilename();
        Path fileNameAndPath = Paths.get(uploadDirectory, originalFilename);
        Files.write(fileNameAndPath, file.getBytes());

        // Set the image file name in the userDetailsRequest
        userDetailsRequest.setProfileImage(originalFilename);

        // Update user details
        userService.updateUserDetails(userId, userDetailsRequest);

        return ResponseEntity.ok("User details updated successfully");
    }

    // API endpoint to get the image of a particular user
    @GetMapping("/user/getProfileImage/{userId}")
    public ResponseEntity<Resource> getProfileImage(@PathVariable Long userId) throws IOException {
        // Fetch user details from the database based on userId
        User userDetails = userService.getUserDetailsById(userId);

        // Get the image file path from the user details
        Path imagePath = Paths.get(uploadDirectory, userDetails.getProfileImage());

        // Create a resource from the image file
        Resource resource = new FileSystemResource(imagePath.toFile());

        // Determine the content type of the image
        String contentType = Files.probeContentType(imagePath);
        if (contentType == null) {
            // If MIME type is null, set a default MIME type for images
            contentType = "image/jpeg"; // Or any other appropriate default MIME type
        }

        // Return the image file as a ResponseEntity with appropriate content type
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }



    @PutMapping("/user/update/profile/{userId}")
    public ResponseEntity<String> updateProfile(@PathVariable Long userId, @RequestBody UpdateProfileDTO updateProfileDTO) {
        try {
            userService.updateProfile(userId, updateProfileDTO.getEmail(), updateProfileDTO.getPassword());
            return ResponseEntity.ok("Profile updated successfully");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the profile");
        }
    }



}



















//
//    @Autowired
//    private UserService userService;
//
//    @DeleteMapping("/{userId}")
//    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
//        userService.deleteUser(userId);
//        return ResponseEntity.ok("User and associated data deleted successfully.");
//    }

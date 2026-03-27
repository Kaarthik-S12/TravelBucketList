package com.projectTravel.TravelMust.Controller;

import com.projectTravel.TravelMust.Model.Profiles;
import com.projectTravel.TravelMust.Model.Users;
import com.projectTravel.TravelMust.Repo.UserRepo;
import com.projectTravel.TravelMust.Service.ProfileServices;
import com.projectTravel.TravelMust.Service.UserService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping
public class ProfileController {
    @Autowired
    private ProfileServices pro;
   @Autowired
   private UserService pro1;

    @GetMapping("/profile/{email}")
    public ResponseEntity<Profiles> getProfile(@PathVariable String email) {
        Profiles profile = pro.getProfileByEmail(email);
        if (profile != null) {
            return ResponseEntity.ok(profile); // Return profile details as response
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if profile is not found
    }
    @PostMapping("/profile")
    public ResponseEntity<String> addProfile(@RequestBody Profiles profile) {
        Profiles savedProfile = pro.addProfile(profile);
        if (savedProfile != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Profile added successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error adding profile");
    }
    @PostMapping("/profile/{email}/uploadPicture")
    public ResponseEntity<String> uploadProfilePicture(@PathVariable String email, @RequestParam("file") MultipartFile file) {
        try {
            pro.updateProfilePicture(email, file);
            return ResponseEntity.ok("Profile picture uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error uploading profile picture");
        }
    }
    @PostMapping("/profile/{email}/changePassword")
    public ResponseEntity<String> changePassword(@PathVariable String email, @RequestBody Map<String, String> request) {
        String newPassword = request.get("password");

        // Change the password using the service
        boolean passwordChanged = pro1.changePassword(email, newPassword);
        if (passwordChanged) {
            return ResponseEntity.ok("Password updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
    }

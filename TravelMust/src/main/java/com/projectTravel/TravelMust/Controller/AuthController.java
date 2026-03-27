package com.projectTravel.TravelMust.Controller;


import com.projectTravel.TravelMust.Model.Users;
import com.projectTravel.TravelMust.Security.JwtUtil;
import com.projectTravel.TravelMust.Service.ProfileServices;
import com.projectTravel.TravelMust.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
@CrossOrigin
public class AuthController {
      @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody Users user) {
        if (userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body(userService.findByEmail(user.getEmail())+"");
        }
        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully!");
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Users user) {
        boolean isVerified = userService.verifyUser(user.getEmail(), user.getPassword());
        if (!isVerified) {
            return ResponseEntity.badRequest().body("Invalid email or password!");
        }

        String token = JwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(token);
    }
}

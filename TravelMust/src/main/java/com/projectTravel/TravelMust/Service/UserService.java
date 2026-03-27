package com.projectTravel.TravelMust.Service;

import com.projectTravel.TravelMust.Model.Users;
import com.projectTravel.TravelMust.Repo.UserRepo;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo userrepo;
    public Users registerUser(Users user) {
        // Hash the password before saving
        user.setPassword(hashPassword(user.getPassword()));
        return userrepo.save(user);
    }

    // Verify user credentials during login
    public boolean verifyUser(String email, String password) {
        Users user = userrepo.findByEmail(email).orElse(null);
        if (user == null) {
            return false; // User not found
        }
        return checkPassword(password, user.getPassword());
    }
    private String hashPassword(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
    }

    // Check password using BCrypt
    private boolean checkPassword(String plainPassword, String hashedPassword) {
        return BCrypt.checkpw(plainPassword, hashedPassword);
    }
    public Users findByEmail(String email) {
        return userrepo.findByEmail(email).orElse(null);
    }
    public boolean changePassword(String email, String newPassword) {
        Users user = userrepo.findByEmail(email).orElse(null);
        if (user == null) {
            return false; // User not found
        }

        // Hash the new password before saving
        String hashedPassword = hashPassword(newPassword);

        // Update the user's password with the new hashed password
        user.setPassword(hashedPassword);
        userrepo.save(user); // Save the updated user

        return true;
    }
}

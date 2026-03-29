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
        user.setPassword(hashPassword(user.getPassword()));
        return userrepo.save(user);
    }

    public boolean verifyUser(String email, String password) {
        Users user = userrepo.findByEmail(email).orElse(null);
        if (user == null) {
            return false; 
        }
        return checkPassword(password, user.getPassword());
    }
    private String hashPassword(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
    }

    private boolean checkPassword(String plainPassword, String hashedPassword) {
        return BCrypt.checkpw(plainPassword, hashedPassword);
    }
    public Users findByEmail(String email) {
        return userrepo.findByEmail(email).orElse(null);
    }
    public boolean changePassword(String email, String newPassword) {
        Users user = userrepo.findByEmail(email).orElse(null);
        if (user == null) {
            return false; 
        }

        String hashedPassword = hashPassword(newPassword);

        user.setPassword(hashedPassword);
        userrepo.save(user); 

        return true;
    }
}

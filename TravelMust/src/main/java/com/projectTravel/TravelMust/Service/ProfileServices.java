package com.projectTravel.TravelMust.Service;


import com.projectTravel.TravelMust.Model.Profiles;
import com.projectTravel.TravelMust.Model.Users;
import com.projectTravel.TravelMust.Repo.ProfileRepo;
import com.projectTravel.TravelMust.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ProfileServices {
    @Autowired
    private ProfileRepo  profileRepo;
    public Profiles getProfileByEmail(String email) {
        return profileRepo.getDetailsByEmail(email);

    }
    public void updateProfilePicture(String email, MultipartFile file) throws IOException {
        Profiles profile = profileRepo.getDetailsByEmail(email);
        profile.setProfilePicture(file.getBytes());
        profileRepo.save(profile);
    }

    public Profiles addProfile(Profiles profile) {
        return profileRepo.save(profile);
    }



}

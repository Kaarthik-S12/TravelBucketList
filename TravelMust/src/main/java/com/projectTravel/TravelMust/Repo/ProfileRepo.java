package com.projectTravel.TravelMust.Repo;

import com.projectTravel.TravelMust.Model.Profiles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepo extends JpaRepository<Profiles,String> {
    Profiles getDetailsByEmail(String email);
}

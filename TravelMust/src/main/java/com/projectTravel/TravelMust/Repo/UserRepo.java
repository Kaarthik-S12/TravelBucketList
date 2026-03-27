package com.projectTravel.TravelMust.Repo;

import com.projectTravel.TravelMust.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<Users,Long> {
    Optional<Users> findByEmail(String email);
}

package com.projectTravel.TravelMust.Repo;

import com.projectTravel.TravelMust.Model.Saved;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SavedRepo extends JpaRepository<Saved,Long> {
    List<Saved> findByEmail(String email);
    Optional<Saved> findByEmailAndName(String email, String name);
}

package com.projectTravel.TravelMust.Repo;

import com.projectTravel.TravelMust.Model.Places;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlacesRepo extends JpaRepository<Places,Long> {
}

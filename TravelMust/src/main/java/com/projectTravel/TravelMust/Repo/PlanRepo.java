package com.projectTravel.TravelMust.Repo;

import com.projectTravel.TravelMust.Model.Planning;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepo extends JpaRepository<Planning,Long> {
}

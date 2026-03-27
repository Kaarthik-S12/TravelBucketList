package com.projectTravel.TravelMust.Repo;

import com.projectTravel.TravelMust.Model.Movies;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepo extends JpaRepository<Movies,Long> {
}

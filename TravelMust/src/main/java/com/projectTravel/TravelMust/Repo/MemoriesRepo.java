package com.projectTravel.TravelMust.Repo;

import com.projectTravel.TravelMust.Model.Memories;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemoriesRepo extends JpaRepository<Memories,Long> {
    List<Memories> findByEmail(String email);
}

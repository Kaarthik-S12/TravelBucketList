package com.projectTravel.TravelMust.Service;


import com.projectTravel.TravelMust.Model.Planning;
import com.projectTravel.TravelMust.Repo.PlanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanningService {
    @Autowired
    private PlanRepo planningRepo;

    public List<Planning> getAllPlans() {
        return planningRepo.findAll();
    }
}

package com.projectTravel.TravelMust.Controller;

import com.projectTravel.TravelMust.Model.Planning;
import com.projectTravel.TravelMust.Service.PlanningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
public class PlanningController {
    @Autowired
    private PlanningService planningService;
    @GetMapping("/planning")
    public ResponseEntity<List<Planning>> getPlanning(){
        List<Planning> plans = planningService.getAllPlans();
        return ResponseEntity.ok(plans);
    }
}

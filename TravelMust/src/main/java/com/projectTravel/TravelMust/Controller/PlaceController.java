package com.projectTravel.TravelMust.Controller;

import com.projectTravel.TravelMust.Model.Places;
import com.projectTravel.TravelMust.Service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
public class PlaceController {
    @Autowired
    private PlaceService placeService;
    @GetMapping("/places")
    public ResponseEntity<List<Places>> getPlaces(){
        return ResponseEntity.ok(placeService.getPlaces());
    }
}

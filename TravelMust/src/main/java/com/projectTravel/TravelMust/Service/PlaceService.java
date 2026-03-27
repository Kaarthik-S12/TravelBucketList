package com.projectTravel.TravelMust.Service;

import com.projectTravel.TravelMust.Model.Places;
import com.projectTravel.TravelMust.Repo.PlacesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceService {
    @Autowired
    private PlacesRepo placesRepo;
    public List<Places> getPlaces(){
        return placesRepo.findAll();
    }
}

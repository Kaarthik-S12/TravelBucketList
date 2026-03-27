package com.projectTravel.TravelMust.Controller;

import com.projectTravel.TravelMust.Model.Movies;
import com.projectTravel.TravelMust.Service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
public class MovieController {
    @Autowired
    private MovieService movie;
    @GetMapping("/movies")
    public ResponseEntity<List<Movies>> getMovies(){
        List<Movies> movies = movie.getAllMovies(); // Fetch all movies from service
        return ResponseEntity.ok(movies);
    }
}

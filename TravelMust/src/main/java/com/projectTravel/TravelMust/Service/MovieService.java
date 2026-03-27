package com.projectTravel.TravelMust.Service;

import com.projectTravel.TravelMust.Model.Movies;
import com.projectTravel.TravelMust.Repo.MovieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    @Autowired
    private MovieRepo moviesRepo;

    // Method to retrieve all movies
    public List<Movies> getAllMovies() {
        return moviesRepo.findAll(); // This fetches all movies from the database
    }
}

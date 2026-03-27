package com.projectTravel.TravelMust.Service;

import com.projectTravel.TravelMust.Model.Saved;
import com.projectTravel.TravelMust.Repo.SavedRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SaveService {
    @Autowired
    private SavedRepo saveRepository;

    public List<Saved> getSavedByEmail(String email) {
        return saveRepository.findByEmail(email);
    }

    public Optional<Saved> findByEmailAndName(String email, String name) {
        return saveRepository.findByEmailAndName(email, name);
    }

    public void save(Saved saved) {
        saveRepository.save(saved);
    }
    public Optional<Saved> getById(long id) {
        return saveRepository.findById(id);
    }

    // Delete a Saved entry by ID
    public void delete(long id) {
        saveRepository.deleteById(id);
    }
    public void markAsCompleted(long id) {
        Optional<Saved> saved = getById(id);
        if (saved.isPresent()) {
            Saved savedEntry = saved.get();
            savedEntry.setCompleted(true);  // Mark as done
            saveRepository.save(savedEntry);  // Save the updated entity
        }
    }
}

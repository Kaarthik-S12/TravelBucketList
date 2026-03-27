package com.projectTravel.TravelMust.Controller;

import com.projectTravel.TravelMust.Model.Saved;
import com.projectTravel.TravelMust.Service.SaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
public class SaveController {
    @Autowired
    private SaveService saveService;
    @GetMapping("/saved")
    public ResponseEntity<List<Saved>> getSaved(@RequestParam String email) {
        List<Saved> savedList = saveService.getSavedByEmail(email);
        return ResponseEntity.ok(savedList);
    }
    @PostMapping("/saved")
    public ResponseEntity<String> addSaved(@RequestBody Saved saved) {
        Optional<Saved> existingSaved = saveService.findByEmailAndName(saved.getEmail(), saved.getName());

        if (existingSaved.isPresent() && !existingSaved.get().isCompleted()) {
            return ResponseEntity.badRequest().body("Not added: Already exists and is not completed");
        }

        saveService.save(saved);
        return ResponseEntity.ok("Saved successfully");
    }
    @DeleteMapping("/saved/{id}")
    public ResponseEntity<String> deleteSaved(@PathVariable long id) {
        Optional<Saved> saved = saveService.getById(id);

        if (saved.isPresent()) {
            saveService.delete(id);
            return ResponseEntity.ok("Saved entry has been deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("Saved entry not found.");
        }
    }
    @PutMapping("/saved/{id}/complete")
    public ResponseEntity<String> markAsCompleted(@PathVariable long id) {
        Optional<Saved> saved = saveService.getById(id);

        if (saved.isPresent()) {
            Saved savedEntry = saved.get();
            savedEntry.setCompleted(true);  // Mark as done
            saveService.save(savedEntry);   // Save the updated entity

            return ResponseEntity.ok("Marked as completed successfully.");
        } else {
            return ResponseEntity.status(404).body("Saved entry not found.");
        }
    }

}

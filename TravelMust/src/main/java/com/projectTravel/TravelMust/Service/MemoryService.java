package com.projectTravel.TravelMust.Service;

import com.projectTravel.TravelMust.Model.Memories;
import com.projectTravel.TravelMust.Repo.MemoriesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemoryService {
    @Autowired
    private MemoriesRepo memoriesRepo;
    public void addMemory(Memories memory) {
        memoriesRepo.save(memory);
    }

    public List<Memories> getMemoriesByEmail(String email) {
        return memoriesRepo.findByEmail(email);
    }

    public Optional<Memories> getMemoryById(Long id) {
        return memoriesRepo.findById(id);
    }
}

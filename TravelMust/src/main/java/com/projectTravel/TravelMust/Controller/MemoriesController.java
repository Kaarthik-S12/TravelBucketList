package com.projectTravel.TravelMust.Controller;

import com.projectTravel.TravelMust.Model.Memories;
import com.projectTravel.TravelMust.Service.MemoryService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
public class MemoriesController {
    @Autowired
    private MemoryService memoryService;
    @PostMapping("/memories")
    public String addMemory(@RequestParam("email") String email,
                            @RequestParam("name") String name,
                            @RequestParam("date") String date,
                            @RequestParam("imageFile") MultipartFile imageFile) throws IOException {
        // Log incoming data
        System.out.println("Received data: ");
        System.out.println("Email: " + email);
        System.out.println("Name: " + name);
        System.out.println("Date: " + date);
        System.out.println("Image: " + (imageFile != null ? imageFile.getOriginalFilename() : "No file"));

        // Convert date
        LocalDate dates = LocalDate.parse(date);

        // Get image bytes
        byte[] imageBytes = imageFile.getBytes();

        // Create the memory object
        Memories memory = new Memories(email, name, dates, imageBytes);
        memoryService.addMemory(memory);

        return "Memory added successfully!";
    }

    @GetMapping("/memories/{email}")
    public List<Memories> getMemoriesByEmail(@PathVariable String email) {
        return memoryService.getMemoriesByEmail(email);
    }
    @GetMapping("/memories/image/{id}")
    public void getMemoryImage(@PathVariable Long id, HttpServletResponse response) throws IOException {
        Optional<Memories> memory = memoryService.getMemoryById(id);
        byte[] imageBytes = memory.get().getImage();  // Assuming 'image' is a byte array in the Memories entity

        response.setContentType("image/jpeg"); // Or the correct MIME type
        response.getOutputStream().write(imageBytes);
    }
}

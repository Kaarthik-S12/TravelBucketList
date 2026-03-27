package com.projectTravel.TravelMust.Model;
import jakarta.persistence.*;

@Entity
public class Saved {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
     private String email;
     private String image;
     private String name;
     private String location;
     private String description;
     private boolean completed;
    public Saved() {
    }

    // Parameterized constructor
    // Parameterized constructor
    public Saved(String email, String image, String name, String location, String description, boolean completed) {
        this.email = email;
        this.image = image;
        this.name = name;
        this.location = location;
        this.description = description;
        this.completed = completed;
    }


    // Getters and Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}


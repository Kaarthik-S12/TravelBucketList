package com.projectTravel.TravelMust.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Places {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String image;
    private String name;
    private String location;
    private String description;

    public Places() {
    }
    public Places(String image,String name,String location,String description){
        this.description=description;
        this.image=image;
        this.location=location;
        this.name=name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

package com.projectTravel.TravelMust.Model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
public class Memories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String email;
    private String name;
    private LocalDate date;
    @Lob // Store large binary objects
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;
    // Default constructor
    public Memories() {
    }

    // Parameterized constructor
    public Memories(String email, String name, LocalDate date, byte[] image) {
        this.email = email;
        this.name = name;
        this.date = date;
        this.image = image;
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

    public String getPlace() {
        return name;
    }

    public void setPlace(String place) {
        this.name = place;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}

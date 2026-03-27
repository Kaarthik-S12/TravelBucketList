package com.projectTravel.TravelMust.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "profiles")
public class Profiles {

    @Id
    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private long phoneNumber;

    @Column(nullable = false)
    private String gender;
    @Lob  // Use @Lob for large data storage
    private byte[] profilePicture;
    // Default constructor (required by JPA)
    public Profiles() {
    }
    public byte[] getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }
    // Parameterized constructor (optional)
    public Profiles(String email, String firstName, String lastName, long phoneNumber, String gender,byte[] profilePicture) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.profilePicture=profilePicture;
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}

package com.flightapp.database.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "turist")
public class Turist {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String surname;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "turist_gender",
            joinColumns = @JoinColumn(name = "tursit_id"),
            inverseJoinColumns = @JoinColumn(name = "gender_id"))
    private Set<Gender> gedners = new HashSet<>();

    private String notes;

    private LocalDate birthDate;

    @OneToMany(mappedBy = "turist")
    private Set<Flight> flights;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Set<Gender> getGedners() {
        return gedners;
    }

    public void setGedners(Set<Gender> gedners) {
        this.gedners = gedners;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public Set<Flight> getFlights() {
        return flights;
    }

    public void setFlights(Set<Flight> flights) {
        this.flights = flights;
    }
}

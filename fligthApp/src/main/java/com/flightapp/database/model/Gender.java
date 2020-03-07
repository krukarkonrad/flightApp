package com.flightapp.database.model;

import org.hibernate.annotations.NaturalId;

import javax.persistence.*;

@Entity
@Table(name = "genders")
public class Gender {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 30)
    private GenderName gender;

    public Gender(){}

    public Gender(GenderName genderName){
        this.gender = genderName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public GenderName getGender() {
        return gender;
    }

    public void setGender(GenderName gender) {
        this.gender = gender;
    }
}

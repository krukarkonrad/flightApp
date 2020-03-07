package com.flightapp.database.repository;

import com.flightapp.database.model.Gender;
import com.flightapp.database.model.GenderName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GenderRepository extends JpaRepository <Gender, Long> {
    Optional<Gender> findByGender(GenderName genderName);
}

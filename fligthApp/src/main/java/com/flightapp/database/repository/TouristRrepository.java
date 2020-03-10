package com.flightapp.database.repository;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.flightapp.database.helpermodels.TourstNoFlight;
import com.flightapp.database.model.Tourist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Set;

@Repository
public interface TouristRrepository extends JpaRepository<Tourist, Long> {
//
//    @Query("SELECT t.id, t.name, t.suranem, t.gender, t.notes, t.birthDate " +
//            "from tourist t " +
//            "JOIN ")
//    Set<TourstNoFlight> findAllNoFligth(Long fligthId);

}

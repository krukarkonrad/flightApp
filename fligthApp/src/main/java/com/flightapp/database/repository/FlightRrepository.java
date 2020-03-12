package com.flightapp.database.repository;

import com.flightapp.database.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface FlightRrepository extends JpaRepository<Flight, Long> {

    @Query(value = "select * FROM flight f WHERE f.fligth_start > (:flightStart) ORDER BY fligth_start ASC"
            , nativeQuery = true)
    List<Flight> findWithStartingDate(@Param("flightStart") LocalDate flightStart);

    @Query(value = "select * FROM flight f WHERE f.fligth_start > (:flightStart) AND f.fligth_end < (:flightEnd) ORDER BY fligth_start ASC"
    ,nativeQuery = true)
    List<Flight> findWithRange(@Param("flightStart")LocalDate flightStart, @Param("flightEnd")LocalDate flightEnd);

}

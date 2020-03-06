package com.flightapp.database.repository;

import com.flightapp.database.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRrepository extends JpaRepository<Flight, Long> {
}

package com.flightapp.database.repository;

import com.flightapp.database.model.Turist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TuristRrepository extends JpaRepository<Turist, Long> {

}

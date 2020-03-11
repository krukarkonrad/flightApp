package com.flightapp.database.repository;

import com.flightapp.database.model.Tourist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TouristRrepository extends JpaRepository<Tourist, Long> {

}

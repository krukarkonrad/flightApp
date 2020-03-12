package com.flightapp.service;

import com.flightapp.database.model.Flight;
import com.flightapp.database.model.Tourist;
import com.flightapp.database.repository.FlightRrepository;
import com.flightapp.database.repository.TouristRrepository;
import com.flightapp.payload.FligthSearchRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Set;

@Service
public class ParticipateService {

    @Autowired
    TouristRrepository touristRrepository;

    @Autowired
    FlightRrepository flightRrepository;

    @Autowired
    TouristService touristService;

    @Autowired
    FlightService flightService;

    public String addTouristToFlight (Long touristId, Long flightId){

        Tourist tourist = getTourist(touristId);
        Flight flight = getFlight(flightId);

        tourist.getFlights().add(flight);
        flight.getTourists().add(tourist);

        touristRrepository.save(tourist);
        flightRrepository.save(flight);

        return("Relationship added!");
    }

    public String deleteTouristFromFlight(Long touristId, Long flightId){

        Tourist tourist = getTourist(touristId);
        Flight flight = getFlight(flightId);

        tourist.getFlights().remove(flight);
        flight.getTourists().remove(tourist);

        touristRrepository.save(tourist);
        flightRrepository.save(flight);

        return("Relationship removed!");
    }

        private Tourist getTourist(Long id){
            return touristService.findById(id);
        }

        private  Flight getFlight(Long id){
            return flightService.findById(id);
        }

//    public Flight searchForFligth(LocalDate startDate, LocalDate endDate){
//
//    }
}

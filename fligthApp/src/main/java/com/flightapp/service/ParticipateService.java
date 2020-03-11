package com.flightapp.service;

import com.flightapp.database.model.Flight;
import com.flightapp.database.model.Tourist;
import com.flightapp.database.repository.FlightRrepository;
import com.flightapp.database.repository.TouristRrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ParticipateService {

    @Autowired
    TouristRrepository touristRrepository;

    @Autowired
    FlightRrepository flightRrepository;

    public String addTouristToFlight (Long touristId, Long flightId){

        Tourist tourist;
        Flight flight;

        if(touristRrepository.existsById(touristId)){
            tourist = touristRrepository.getOne(touristId);
        } else {
            return ("No user found");
        }

        if(flightRrepository.existsById(flightId)){
            flight = flightRrepository.getOne(flightId);
        } else {
            return ("No flight found");
        }

        tourist.getFlights().add(flight);
        flight.getTourists().add(tourist);

        touristRrepository.save(tourist);
        flightRrepository.save(flight);

        return("Relationship added!");
    }

    public String deleteTouristFromFlight(Long touristId, Long flightId){

        Tourist tourist;
        Flight flight;

        if(touristRrepository.existsById(touristId)){
            tourist = touristRrepository.getOne(touristId);
        } else {
            return ("No user found");
        }

        if(flightRrepository.existsById(flightId)){
            flight = flightRrepository.getOne(flightId);
        } else {
            return ("No flight found");
        }

        tourist.getFlights().remove(flight);
        flight.getTourists().remove(tourist);

        touristRrepository.save(tourist);
        flightRrepository.save(flight);

        return("Relationship removed!");
    }

}

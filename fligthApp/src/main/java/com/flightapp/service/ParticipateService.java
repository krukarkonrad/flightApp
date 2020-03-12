package com.flightapp.service;

import com.flightapp.database.model.Flight;
import com.flightapp.database.model.Tourist;
import com.flightapp.database.repository.FlightRrepository;
import com.flightapp.database.repository.TouristRrepository;
import com.flightapp.exception.AppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ParticipateService //implements Comparable<Flight>
{

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

        if(flight.getTakenSeatss() < flight.getSeats()){
            tourist.getFlights().add(flight);
            flight.getTourists().add(tourist);

            flight.setTakenSeatss(flight.getTakenSeatss()+1);

            touristRrepository.save(tourist);
            flightRrepository.save(flight);

            return ("Relationship added!");
        } else {
            return ("Not enough seates availbe");
        }

    }

    public String deleteTouristFromFlight(Long touristId, Long flightId){

        Tourist tourist = getTourist(touristId);
        Flight flight = getFlight(flightId);

        tourist.getFlights().remove(flight);
        flight.getTourists().remove(tourist);
        flight.setTakenSeatss(flight.getTakenSeatss()-1);

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


    public List<Flight> searchForFlight(LocalDate flightStart, LocalDate flightEnd ){
        if(flightEnd != null){
            if(flightStart.isBefore(flightEnd)){
                return withRange(flightStart, flightEnd);
            }
            else {
                throw new AppException("Wrong range!");
            }
        } else {
            return noRange(flightStart);
        }
    }

        private List<Flight> noRange(LocalDate flightStart){
            return flightRrepository.findWithStartingDate(flightStart);
        }

        private List<Flight> withRange(LocalDate flightStart, LocalDate flightEnd){
            return flightRrepository.findWithRange(flightStart, flightEnd.plusDays(1));
        }
}

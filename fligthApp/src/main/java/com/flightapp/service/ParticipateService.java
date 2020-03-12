package com.flightapp.service;

import com.flightapp.database.model.Flight;
import com.flightapp.database.model.Tourist;
import com.flightapp.database.repository.FlightRrepository;
import com.flightapp.database.repository.TouristRrepository;
import com.flightapp.exception.AppException;
import com.flightapp.payload.FlightPayload;
import com.flightapp.payload.FligthSearchRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Set;

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

        if(flight.getTakenSeatss() < flight.getTakenSeatss()){
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


    public List<Flight> searchForFligth(FligthSearchRequest fligthSearchRequest){
        if(fligthSearchRequest.getStartDate().isBefore(fligthSearchRequest.getEndDate().plusDays(1)))
            if(isRange(fligthSearchRequest)){
                return withRange(fligthSearchRequest.getStartDate(), fligthSearchRequest.getEndDate());
            } else {
                return noRange(fligthSearchRequest.getStartDate());
            }
        else
            throw new AppException("Wrong range!");
    }

        private boolean isRange(FligthSearchRequest fligthSearchRequest){
            if(fligthSearchRequest.getStartDate() != null && fligthSearchRequest.getEndDate() == null){
                return  false;
            } else if(fligthSearchRequest.getStartDate() != null && fligthSearchRequest.getEndDate() != null)
                return true;
            else throw new AppException("No date given");
        }

        private List<Flight> noRange(LocalDate flightStart){
            return flightRrepository.findWithStartingDate(flightStart);
        }

        private List<Flight> withRange(LocalDate flightStart, LocalDate flightEnd){
            return flightRrepository.findWithRange(flightStart, flightEnd.plusDays(1));
        }
}

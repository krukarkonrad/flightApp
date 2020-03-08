package com.flightapp.service;

import com.flightapp.database.model.Flight;
import com.flightapp.database.model.Turist;
import com.flightapp.database.repository.FlightRrepository;
import com.flightapp.exception.ResourceNotFoundException;
import com.flightapp.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.lang.reflect.Field;
import java.net.URI;
import java.util.List;
import java.util.Map;

@Service
public class FlightService {

    @Autowired
    FlightRrepository flightRrepository;

    public ResponseEntity<?> addFlight(Flight flight){

        Flight result = flightRrepository.save(flight);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/api/flight")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "Flight successfully added"));
    }

    public @ResponseBody
    List<Flight> findAll(){
        return flightRrepository.findAll();
    }

    public @ResponseBody Flight findById(Long id){
        return flightRrepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Flight", "id", id));
    }

    public String deleteById(Long id){
        if(flightRrepository.existsById(id))
            flightRrepository.deleteById(id);
        else
            return "Flight with this id do not exist";
        return "Deleted successfully";
    }

    public @ResponseBody Flight updateFlight(Long id, Map<String, Object> updates){
        Flight flight = flightRrepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Turist", "id", id));

        flightRrepository.save(updateFlightMethod(flight, updates));

        return flight;
    }

        private Flight updateFlightMethod(Flight flight, Map<String, Object> updates){
        updates.forEach((k, v) -> {
            Field field = ReflectionUtils.findField(Flight.class, k);
            if(field != null){
                field.setAccessible(true);
                ReflectionUtils.setField(field, flight, v);
            }
        });
        return flight;
    }

}

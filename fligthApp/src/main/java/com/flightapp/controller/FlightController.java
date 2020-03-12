package com.flightapp.controller;

import com.flightapp.database.model.Flight;
import com.flightapp.database.model.Tourist;
import com.flightapp.payload.FlightPayload;
import com.flightapp.payload.FligthSearchRequest;
import com.flightapp.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/flight")
public class FlightController {

    @Autowired
    FlightService flightService;

    @PostMapping("/add")
    public ResponseEntity<?> addTourist(@Valid @RequestBody Flight flight){
        return flightService.addFlight(flight);
    }

    @GetMapping("/all")
    public @ResponseBody List<Flight> findAll(){
        return flightService.findAll();
    }

    @GetMapping("/{id}")
    public @ResponseBody Flight findById(@PathVariable(value = "id") Long id){
        return flightService.findById(id);
    }

    @PatchMapping("/{id}")
    public @ResponseBody Flight updateTourist(@PathVariable(value = "id") Long id, @RequestBody Map<String, Object> updates){
        return flightService.updateFlight(id, updates);
    }

    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable(value = "id") Long id){
        return flightService.deleteById(id);
    }


}

package com.flightapp.controller;

import com.flightapp.database.model.Flight;
import com.flightapp.database.model.Tourist;
import com.flightapp.payload.FlightPayload;
import com.flightapp.payload.FligthSearchRequest;
import com.flightapp.payload.TouristRequest;
import com.flightapp.service.ParticipateService;
import com.flightapp.service.TouristService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tourist")
public class TouristController {

    @Autowired
    private TouristService touristService;

    @Autowired
    private ParticipateService participateService;

    @PostMapping("/add")
    public ResponseEntity<?> addTourist(@Valid @RequestBody TouristRequest touristRequest){
        return touristService.addTourist(touristRequest);
    }

    @GetMapping("/all")
    public @ResponseBody List<Tourist> findAll(){
        return touristService.findAll();
    }

    @GetMapping("/{id}")
    public @ResponseBody Tourist findById(@PathVariable(value = "id") Long id){
        return touristService.findById(id);
    }

    @PatchMapping("/{id}")
    public @ResponseBody Tourist updateTourist(@PathVariable(value = "id") Long id, @RequestBody Map<String, Object> updates){
        return touristService.updateTourist(id, updates);
    }

    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable(value = "id") Long id){
        return touristService.deleteById(id);
    }



    @PutMapping("/{touristid}/inflight/{flightid}")
    public String addTouristToFlight(@PathVariable(value = "touristid") Long touristId,
                                     @PathVariable(value = "flightid") Long flightId) {
        return participateService.addTouristToFlight(touristId, flightId);
    }

    @DeleteMapping("/{touristid}/inflight/{flightid}")
    public String deleteTouristFromFlight(@PathVariable(value = "touristid") Long touristId,
                                     @PathVariable(value = "flightid") Long flightId) {
        return participateService.deleteTouristFromFlight(touristId, flightId);
    }

    @GetMapping(value = {"/search/{flightstart}", "/search/{flightstart}/{flightend}"})
    public List<Flight> findFlights(@PathVariable(value = "flightstart")
                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate flightStart,
                            @PathVariable(value = "flightend", required = false)
                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate flightEnd){
        return participateService.searchForFlight(flightStart,flightEnd);
    }
}

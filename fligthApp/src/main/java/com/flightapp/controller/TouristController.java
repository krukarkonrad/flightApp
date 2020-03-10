package com.flightapp.controller;

import com.flightapp.database.model.Tourist;
import com.flightapp.payload.TouristRequest;
import com.flightapp.service.TouristService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tourist")
public class TouristController {

    @Autowired
    private TouristService touristService;

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

}

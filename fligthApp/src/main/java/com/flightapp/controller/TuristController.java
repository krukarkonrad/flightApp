package com.flightapp.controller;

import com.flightapp.database.model.Turist;
import com.flightapp.service.TuristService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/turist")
public class TuristController {

    @Autowired
    private TuristService turistService;

    @PostMapping("/add")
    public ResponseEntity<?> addTurist(@Valid @RequestBody Turist turist){
        return turistService.addTurist(turist);
    }

    @GetMapping("/all")
    public @ResponseBody List<Turist> findAll(){
        return turistService.findAll();
    }

    @GetMapping("/{id}")
    public @ResponseBody Turist findById(@PathVariable(value = "id") Long id){
        return turistService.findById(id);
    }

    @PatchMapping("/{id}")
    public @ResponseBody Turist updateTurist(@PathVariable(value = "id") Long id, @RequestBody Map<String, Object> updates){
        return turistService.updateTurist(id, updates);
    }

    @DeleteMapping("/{id}")
    public String deleteById(@PathVariable(value = "id") Long id){
        return turistService.deleteById(id);
    }




}

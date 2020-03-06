package com.flightapp.security;

import com.flightapp.database.model.Turist;
import com.flightapp.database.repository.TuristRrepository;
import com.flightapp.exception.ResourceNotFoundException;
import com.flightapp.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;

@Service
public class TuristService {

    @Autowired
    TuristRrepository turistRrepository;

    public ResponseEntity<?> addTurist(Turist turist){

        Turist result = turistRrepository.save(turist);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/api/turist")
                 .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User successfully added"));
    }

    public @ResponseBody List<Turist> findAll(){
        return turistRrepository.findAll();
    }

    public @ResponseBody Turist findById(Long id){
        return turistRrepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Turist", "id", id));
    }

    public String deleteById(Long id){
        if(turistRrepository.existsById(id))
            turistRrepository.deleteById(id);
        else
            return "Turist with this id do not exist";
        return "Deleted successfully";
    }

//    public @ResponseBody Turist updateTurist(Long id, Map<String, Object> updates){
//
//    }

}

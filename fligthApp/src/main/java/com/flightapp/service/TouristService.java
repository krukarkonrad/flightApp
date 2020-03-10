package com.flightapp.service;

import com.flightapp.database.enums.GenderName;
import com.flightapp.database.model.Tourist;
import com.flightapp.database.repository.TouristRrepository;
import com.flightapp.exception.ResourceNotFoundException;
import com.flightapp.payload.ApiResponse;
import com.flightapp.payload.TouristRequest;
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
public class TouristService {

    @Autowired
    TouristRrepository touristRrepository;

    public ResponseEntity<?> addTourist(TouristRequest touristRequest){

        Tourist tourist = createTourist(touristRequest);
        tourist.setGender(GenderName.valueOf(touristRequest.getGender()).toString());

        Tourist result = touristRrepository.save(tourist);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/api/tourist/{id}")
                 .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location).
                body(new ApiResponse(true, "User successfully added"));
    }

        private Tourist createTourist(TouristRequest touristRequest){
            return new Tourist(
                    touristRequest.getName(),
                    touristRequest.getSurname(),
                    touristRequest.getCountry(),
                    touristRequest.getNotes(),
                    touristRequest.getBirthDate());
        }

    public @ResponseBody List<Tourist> findAll(){
        return touristRrepository.findAll();
    }

    public @ResponseBody Tourist findById(Long id){
        return touristRrepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tourist", "id", id));
    }

    public String deleteById(Long id){
        if(touristRrepository.existsById(id))
            touristRrepository.deleteById(id);
        else
            return "Tourist with this id do not exist";
        return "Deleted successfully";
    }

    public @ResponseBody Tourist updateTourist(Long id, Map<String, Object> updates){
        Tourist tourist = touristRrepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tourist", "id", id));

        touristRrepository.save(updateTouristMethod(tourist,updates));

        return tourist;
    }

        private Tourist updateTouristMethod(Tourist tourist, Map<String, Object> updates){
            updates.forEach((k, v) -> {
                Field field = ReflectionUtils.findField(Tourist.class, k);
                if(field != null){
                    field.setAccessible(true);
                    ReflectionUtils.setField(field, tourist, v);
                }
            });
            return tourist;
        }

}

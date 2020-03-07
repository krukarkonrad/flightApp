package com.flightapp.service;

import com.flightapp.database.model.Gender;
import com.flightapp.database.model.GenderName;
import com.flightapp.database.model.Turist;
import com.flightapp.database.repository.GenderRepository;
import com.flightapp.database.repository.TuristRrepository;
import com.flightapp.exception.AppException;
import com.flightapp.exception.ResourceNotFoundException;
import com.flightapp.payload.ApiResponse;
import com.flightapp.payload.TuristRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.lang.reflect.Field;
import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class TuristService {

    @Autowired
    TuristRrepository turistRrepository;

    @Autowired
    GenderRepository genderRepository;

    public ResponseEntity<?> addTurist(TuristRequest turistRequest){

        Turist turist = createTurist(turistRequest);
        turist.setGedners(Collections.singleton(setTuristGender(turistRequest)));

        Turist result = turistRrepository.save(turist);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/api/turist/{id}")
                 .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location).
                body(new ApiResponse(true, "User successfully added"));
    }

        private Turist createTurist(TuristRequest turistRequest){
            return new Turist(
                    turistRequest.getName(),
                    turistRequest.getSurname(),
                    turistRequest.getCountry(),
                    turistRequest.getNotes(),
                    turistRequest.getBirthDate());
        }

        private Gender setTuristGender(TuristRequest turistRequest){
            return genderRepository.findByGender(GenderName.valueOf(turistRequest.getGender()))
                    .orElseThrow(() -> new AppException("Gender not set. Add them to DB!"));
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

    public @ResponseBody Turist updateTurist(Long id, Map<String, Object> updates){
        Turist turist = turistRrepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Turist", "id", id));

        turistRrepository.save(updateTuristMethod(turist,updates));

        return turist;
    }

        private Turist updateTuristMethod(Turist turist, Map<String, Object> updates){
            updates.forEach((k, v) -> {
                Field field = ReflectionUtils.findField(Turist.class, k);
                if(field != null){
                    field.setAccessible(true);
                    ReflectionUtils.setField(field, turist, v);
                }
            });
            return turist;
        }

}

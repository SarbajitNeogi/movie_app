package com.movie.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movie.entity.FilmActorDTO;
import com.movie.service.ActorService;

@RestController
public class ActorController {
	
	 @Autowired
	    private ActorService actorService;

	 @GetMapping("/getAllActors")
	    public ResponseEntity<List<FilmActorDTO>> getFilmActorDetails() {
	        List<FilmActorDTO> filmActorDetails = actorService.findFilmActorDetails();
	        if (filmActorDetails.isEmpty()) {
	            return ResponseEntity.noContent().build();
	        }
	        return ResponseEntity.ok(filmActorDetails);
	    }
}

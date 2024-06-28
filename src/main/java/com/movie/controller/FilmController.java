package com.movie.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.movie.request.*;

import com.movie.entity.Film;
import com.movie.service.FilmService;

@RestController
public class FilmController {
	
	@Autowired
	private FilmService service;

	@GetMapping("/getAllFilm")
	public ResponseEntity<List<Film>> getAllFilms(){
		System.out.println("inside method");
		List<Film> films = new ArrayList<Film>();
		films.addAll(service.getFilms());
		return new ResponseEntity<List<Film>>(films, HttpStatus.OK);
	}
	
//	@GetMapping("/ping")
//	public ResponseEntity<List<Film>> getAllFilms(){
//		System.out.println("inside method");
//		List<Film> films = new ArrayList<Film>();
//		films.addAll(service.getFilms());
//		return new ResponseEntity<List<Film>>(films, HttpStatus.OK);
//	}
	
	@PostMapping("/fetchAllFilms")
	//@PostMapping("/add")
	public ResponseEntity<List<Film>> getAllFilms(@RequestBody(required = false) String data) {
	    System.out.println("Inside method");
	    System.out.println("Received data: " + data);

	    List<Film> films = new ArrayList<>(service.getFilms());
	    return new ResponseEntity<>(films, HttpStatus.OK);
	    }
        
	@PostMapping("/search")
    public ResponseEntity<List<Film>> searchFilms(@RequestBody(required = true) FilmRequest request) {
        
         System.out.println("Received data: " + request.getTitle());
         String title = request.getTitle();

        List<Film> films = new ArrayList<>();

        if (title != null && !title.isEmpty()) {
            films.addAll(service.searchFilmsByTitle(title));
            System.out.println(films.size());
        } else {
            films.addAll(service.getFilms());
            System.out.println(films.size());
        }

        return new ResponseEntity<>(films, HttpStatus.OK);
    }
	
	
	 @PostMapping("/add")
	    public ResponseEntity<String> addFilm(@RequestBody FilmRequest filmRequest) {
	        service.addFilm(filmRequest.getTitle(), filmRequest.getDescription(), filmRequest.getReleaseyear(), filmRequest.getLength(),filmRequest.getLanguageId());
	        return new ResponseEntity<>("Film inserted successfully", HttpStatus.CREATED);
	    }
	 
	 
	 @PostMapping("addFilm")
	 public ResponseEntity<String> addNewFilm(@RequestBody FilmRequest filmRequest){
		 String response = "";
		 
		 service.addNewFilm(filmRequest);
		 return new ResponseEntity<>(response, HttpStatus.CREATED);
	 }
	 
	 @PostMapping("/updateFilm")
	 public ResponseEntity<String> updateFilm(@RequestBody FilmRequest request){
		 System.out.println("Film ID" + request.getFilmId());
		 System.out.println(request.getReleaseyear());
		 service.updateNewFilm(request);
		 return new ResponseEntity<>("Film Updated Successfully", HttpStatus.OK);
	 }
	 
	 @PostMapping("/delete")
	    public ResponseEntity<String> deleteFilm(@RequestBody FilmRequest filmRequest) {
	        boolean success = service.softDeleteFilm(filmRequest.getFilmId());
	        if (success) {
	            return new ResponseEntity<>("Film soft deleted successfully", HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("Film with ID " + filmRequest.getFilmId() + " not found", HttpStatus.NOT_FOUND);
	        }
	    }
	 
	 
	 @PostMapping("/completed")
	    public ResponseEntity<String> isCompletedFilm (@RequestBody FilmRequest filmRequest) {
	        boolean success = service.completedFilm(filmRequest.getFilmId());
	        if (success) {
	            return new ResponseEntity<>("Film soft deleted successfully", HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("Film with ID " + filmRequest.getFilmId() + " already added to completed list", HttpStatus.ALREADY_REPORTED);
	        }
	    }
	 
	 
	 @GetMapping("/getAllCompletedFilm")
		public ResponseEntity<List<Film>> getCompletedAllFilms(){
			System.out.println("inside method");
			List<Film> films = new ArrayList<Film>();
			films.addAll(service.getCompletedFilms());
			return new ResponseEntity<List<Film>>(films, HttpStatus.OK);
			
		}
	 
	 @GetMapping("/getCompletedFilmsCount")
	    public ResponseEntity<Integer> getCompletedFilmsCount() {
	        System.out.println("inside count method");
	        int count = service.getCompletedFilms().size();
	        return new ResponseEntity<>(count, HttpStatus.OK);
	    }
	
}


	

 


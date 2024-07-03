package com.movie.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movie.entity.Film;
import com.movie.repository.FilmActorDAO;
import com.movie.repository.FilmDAO;
import com.movie.request.FilmRequest;

import jakarta.transaction.Transactional;

@Service
public class FilmServiceImpl implements FilmService{
	
	@Autowired
	private FilmDAO filmdao;

	@Override
	public List<Film> getFilms() {
		List<Film> films = new ArrayList<Film>();
		films.addAll(filmdao.findByDeletedFalse());
		return films;
	}
	
	@Override
	public List<Film> getCompletedFilms() {
		List<Film> films = new ArrayList<Film>();
		films.addAll(filmdao.findByCompletedTrue());
		return films;
	}

	
	@Override
	 public List<Film> searchFilmsByTitle(String title) {
		System.out.println(title);	
		return  filmdao.findByTitleContaining(title);
	        
	    }
	
	@Override
    @Transactional
    public void addFilm(String title, String description, Integer releaseYear, int length, int languageId) {
        filmdao.insertFilm(title, description, releaseYear, length, languageId);
    }
	
	@Override
	@Transactional
	public boolean softDeleteFilm(Short filmId) {
	    Optional<Film> optionalFilm = filmdao.findById(filmId);
	    if (optionalFilm.isPresent()) {
	        Film film = optionalFilm.get();
	        film.setDeleted(true);
	        filmdao.save(film);
	        return true;
	    }
	    return false;
	}
	
	
	@Override
	@Transactional
	public boolean completedFilm(Short filmId) {
	    Optional<Film> optionalFilm = filmdao.findByC_Id(filmId);
	    if (optionalFilm.isPresent()) {
	        Film film = optionalFilm.get();
	        film.setCompleted(true);
	        filmdao.save(film);
	        return true;
	    }
	    return false;
	}
	
	
	public int getTotalFilms() {
        return (int) filmdao.count();
    }
	
	


	@Override
	public void addNewFilm(FilmRequest request) {
		if(request != null) {
		Film film = new Film();
		film.setTitle(request.getTitle());
		film.setDescription(request.getDescription());
		film.setReleaseyear(request.getReleaseyear());
		film.setLength(1);
		
		filmdao.save(film);
		}
	}
		
		
	@Override
	public void updateNewFilm(FilmRequest request) {
		if(request != null) {
			
		Film film = filmdao.getById(request.getFilmId());
		film.setTitle(request.getTitle());
			film.setDescription(request.getDescription());
			film.setReleaseyear(request.getReleaseyear());
			film.setLength(request.getLength());
			filmdao.save(film);
			}		
		
		
		
	}
	
	
	
	

	
}

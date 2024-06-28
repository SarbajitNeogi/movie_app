package com.movie.service;

import java.time.LocalDate;
import java.util.List;

import com.movie.entity.Film;
import com.movie.request.FilmRequest;

import jakarta.transaction.Transactional;

public interface FilmService {

	public List<Film> getFilms();
	
	public List<Film> getCompletedFilms();
	
	public int getTotalFilms();
	
	public List<Film>searchFilmsByTitle(String title);
	
	void addFilm(String title, String description, Integer releaseYear, int length, int languageId);
	
	public void addNewFilm(FilmRequest request);
	
	public void updateNewFilm(FilmRequest request);
	

	public boolean softDeleteFilm(Short filmId);
	
	public boolean completedFilm(Short filmId);
	
}

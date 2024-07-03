package com.movie.service;

import java.util.List;

import com.movie.entity.FilmActorDTO;

public interface ActorService {

	  List<FilmActorDTO> findFilmActorDetails();
}

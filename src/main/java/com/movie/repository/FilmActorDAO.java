package com.movie.repository;

import java.time.LocalDate;

import com.movie.entity.Film;
import com.movie.entity.FilmActorDTO;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.movie.entity.FilmActorDTO;

import jakarta.transaction.Transactional;

@Repository
public interface FilmActorDAO extends JpaRepository<Film, Long> {

    @Query(value = "SELECT f.film_id AS filmId, f.title, ac.actor_id AS actorId, ac.first_name AS firstName, ac.last_name AS lastName " +
                   "FROM film f " +
                   "JOIN film_actor a ON f.film_id = a.film_id " +
                   "JOIN actor ac ON a.actor_id = ac.actor_id", nativeQuery = true)
    List<FilmActorDTO> findFilmActorDetails();
}

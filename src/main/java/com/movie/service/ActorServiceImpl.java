package com.movie.service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.movie.entity.FilmActorDTO;
import com.movie.repository.FilmActorDAO;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

@Service
public class ActorServiceImpl implements ActorService {

	 @PersistenceContext
	    private EntityManager entityManager;

	    @SuppressWarnings("unchecked")
	    @Override
	    public List<FilmActorDTO> findFilmActorDetails() {
	        System.out.println("Executing query to fetch film actor details...");
	        Query query = entityManager.createNativeQuery(
	            "SELECT f.film_id AS filmId, f.title, ac.actor_id AS actorId, ac.first_name AS firstName, ac.last_name AS lastName " +
	            "FROM sakila.film f " +
	            "INNER JOIN sakila.film_actor a ON f.film_id = a.film_id " +
	            "INNER JOIN sakila.actor ac ON a.actor_id = ac.actor_id"
	        );

	        List<Object[]> resultList = query.getResultList();
	        List<FilmActorDTO> filmActorDTOList = new ArrayList<>();

	        for (Object[] result : resultList) {
	            // Adjust types based on your database schema
	            Long filmId = ((Short) result[0]).longValue(); // Assuming film_id is Short
	            String title = (String) result[1]; // title as String
	            Long actorId = ((Short) result[2]).longValue(); // Assuming actor_id is Short
	            String firstName = (String) result[3]; // firstName as String
	            String lastName = (String) result[4]; // lastName as String

	            FilmActorDTO filmActorDTO = new FilmActorDTO(filmId, title, actorId, firstName, lastName);
	            filmActorDTOList.add(filmActorDTO);
	        }

	        System.out.println("Query executed successfully, results: " + filmActorDTOList.size());
	        return filmActorDTOList;
	    }
}




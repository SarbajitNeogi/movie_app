package com.movie.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.movie.entity.Film;

import jakarta.transaction.Transactional;

@Repository
@EnableJpaRepositories
public interface FilmDAO extends JpaRepository<Film, Short>{
	
	List<Film> findByDeletedFalse();
	
	List<Film> findByCompletedTrue();
	
	@Query("SELECT f FROM Film f WHERE upper(f.title) LIKE CONCAT('%', :title, '%')")
    List<Film> findByTitleContaining(@Param("title") String title);


	@Modifying
    @Transactional
    @Query(value = "INSERT INTO film (title, description, release_year, length, language_id) VALUES (:title, :description, :releaseYear, :length, :languageId)", nativeQuery = true)
    void insertFilm(@Param("title") String title, @Param("description") String description, @Param("releaseYear") long releaseYear, @Param("length") int length, @Param("languageId") int languageId);
	
	@Query("SELECT f FROM Film f WHERE f.filmId = :filmId AND f.deleted = False")
    Optional<Film> findById(@Param("filmId") Short filmId);  // Override findById to exclude soft deleted films
	
	@Query("SELECT f FROM Film f WHERE f.filmId = :filmId AND f.completed = False")
    Optional<Film> findByC_Id(@Param("filmId") Short filmId); 
	

}

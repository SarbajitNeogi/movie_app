package com.movie.entity;

import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.ConstructorResult;
import jakarta.persistence.ColumnResult;
import jakarta.persistence.EntityResult;
import jakarta.persistence.SqlResultSetMapping;
import jakarta.persistence.FieldResult;

import java.io.Serializable;

@SqlResultSetMapping(
	    name = "FilmActorDTOMapping",
	    classes = @ConstructorResult(
	        targetClass = FilmActorDTO.class,
	        columns = {
	            @ColumnResult(name = "filmId", type = Long.class),
	            @ColumnResult(name = "title", type = String.class),
	            @ColumnResult(name = "actorId", type = Long.class),
	            @ColumnResult(name = "firstName", type = String.class),
	            @ColumnResult(name = "lastName", type = String.class)
	        }
	    )
	)

public class FilmActorDTO implements Serializable {
    private Long filmId;
    private String title;
    private Long actorId;
    private String firstName;
    private String lastName;

    public FilmActorDTO(Long filmId, String title, Long actorId, String firstName, String lastName) {
        this.filmId = filmId;
        this.title = title;
        this.actorId = actorId;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Long getFilmId() {
        return filmId;
    }

    public void setFilmId(Long filmId) {
        this.filmId = filmId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getActorId() {
        return actorId;
    }

    public void setActorId(Long actorId) {
        this.actorId = actorId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
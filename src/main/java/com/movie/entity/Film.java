package com.movie.entity;

import java.time.LocalDate;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import jakarta.persistence.*;


@Entity
@SQLDelete(sql = "UPDATE film SET deleted = true WHERE film_id = ?")
//@Where(clause = "deleted = false")
@Table(name = "film")
public class Film {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "film_id")
	private Short filmId;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "release_year")
	private Integer releaseyear;
	
	public Boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	} 
	
	
	public Boolean isCompleted() {
		return completed;
	}

	public void setCompleted(Boolean completed) {
		this.completed = completed;
	}
	
	
	
	@Column(name = "deleted")
	private Boolean deleted = Boolean.FALSE ;
	
	@Column(name= "completed")
	private Boolean completed = Boolean.FALSE;
	
	
	public Integer getReleaseyear() {
		return releaseyear;
	}

	public void setReleaseyear(Integer releaseyear) {
		this.releaseyear = releaseyear;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	@Column(name="length")
	private int length;

	public Short getFilmId() {
		return filmId;
	}

	public void setFilmId(Short filmId) {
		this.filmId = filmId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
//	 @ManyToOne(fetch = FetchType.LAZY)
//	    @JoinColumn(name = "language_id", referencedColumnName = "language_id")
//	    private Language language;
//
//	    // Constructor with default initialization
//	 public Film() {
//	        // Initialize language with a default Language object
//	        this.language = new Language(); // This assumes Language has a default constructor
//	        this.language.setLanguageId((short) 1); // Set default languageId
//	    }
//	 
//	 @Entity
//	 @Table(name = "language")
//	 public class Language {
//
//		 @Id
//		    @GeneratedValue(strategy = GenerationType.AUTO)
//		    @Column(name = "language_id")
//	     private Short languageId;
//
//		public Short getLanguageId() {
//			return languageId;
//		}
//
//		public void setLanguageId(Short languageId) {
//			this.languageId = languageId;
//		}
//	     
//	 }

	
	
	
	/*
	@Column(name = "release_year")
	private int releaseYear;
	
	@Column(name = "language_id")            
	private int languageId;
	
	@Column(name = "original_language_id")
	private Integer originalLanguageId;
	
	@Column(name = "rental_duration")
	private int rentalDuration;
	
	public void setOriginalLanguageId(Integer originalLanguageId) {
		this.originalLanguageId = originalLanguageId;
	}

	@Column(name = "rental_rate")
	private float rentalRate;
	
	@Column(name = "length")
	private int length;
	
	@Column(name = "replacement_cost")
	private float replacementCost;
	
	@Column(name = "rating")
	private String rating;
	
	@Column(name = "special_features")
	private String specialFeatures;

	@Column(name="last_update")
	private String lastUpdate;
	
	

	public String getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(String lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getReleaseYear() {
		return releaseYear;
	}

	public int getOriginalLanguageId() {
		return originalLanguageId;
	}

	public void setOriginalLanguageId(int originalLanguageId) {
		this.originalLanguageId = originalLanguageId;
	}



	public void setReleaseYear(int releaseYear) {
		this.releaseYear = releaseYear;
	}

	public int getLanguageId() {
		return languageId;
	}

	public void setLanguageId(int languageId) {
		this.languageId = languageId;
	}

	public int getRentalDuration() {
		return rentalDuration;
	}

	public void setRentalDuration(int rentalDuration) {
		this.rentalDuration = rentalDuration;
	}

	public float getRentalRate() {
		return rentalRate;
	}

	public void setRentalRate(float rentalRate) {
		this.rentalRate = rentalRate;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public float getReplacementCost() {
		return replacementCost;
	}

	public void setReplacementCost(float replacementCost) {
		this.replacementCost = replacementCost;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public String getSpecialFeatures() {
		return specialFeatures;
	}

	public void setSpecialFeatures(String specialFeatures) {
		this.specialFeatures = specialFeatures;
	}
	*/
	
	
	
}

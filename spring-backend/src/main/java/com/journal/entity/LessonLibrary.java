package com.journal.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "LessonLibrary")
public class LessonLibrary {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name")
	private String name; 
	
	@Column(name = "description")
	private String description; 
	
	@Column(name = "user_id")
	private Long userId;

	public LessonLibrary(String name, String description, Long userId) {
		this.name = name;
		this.description = description;
		this.userId = userId;
	}

	public LessonLibrary() {
		
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	} 
	
	public void setLessonLibrary(LessonLibrary lessonLibrary) {
		this.description = lessonLibrary.description;
		this.name = lessonLibrary.name;
		this.userId = lessonLibrary.userId;
	}
	
}

package com.journal.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "OpenedStudents")
public class OpenedStudents {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "student_id")
	private Long studentId;
	
	@Column(name = "user_id")
	private Long userId;

	public OpenedStudents(Long studentId, Long userId) {
		this.studentId = studentId;
		this.userId = userId;
	}

	public OpenedStudents() {
	}
	
	public Long getId() {
		return id;
	}

	public Long getStudentId() {
		return studentId;
	}

	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
}

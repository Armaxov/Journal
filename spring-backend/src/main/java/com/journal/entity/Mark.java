package com.journal.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "mark")
public class Mark {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "student_id")
	private int studentId;
	
	@Column(name = "lesson_id")
	private int lessonId;
	
	@Column(name = "journal_id")
	private Long journalId;
	
	@Column(name = "mark")
	private String mark;

	public Mark() {
	}
	
	public Mark(int studentId, int lessonId, String mark, Long journalId) {
		super();
		this.studentId = studentId;
		this.lessonId = lessonId;
		this.mark = mark;
		this.journalId = journalId;
	}
	
	public Long getJournalId() {
		return journalId;
	}

	public void setJournalId(Long journalId) {
		this.journalId = journalId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getStudentId() {
		return studentId;
	}

	public void setStudentId(int studentId) {
		this.studentId = studentId;
	}

	public int getLessonId() {
		return lessonId;
	}

	public void setLessonId(int lessonId) {
		this.lessonId = lessonId;
	}

	public String getMark() {
		return mark;
	}

	public void setMark(String mark) {
		this.mark = mark;
	}

	public void changeMarkData(Mark newMark) {
		this.lessonId = newMark.lessonId;
		this.mark = newMark.mark;
		this.studentId = newMark.studentId;
		this.journalId = newMark.journalId;
	}
	
	
}

package com.journal.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "journal")
public class Journal implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "group_id")
	private int groupId;
	
	@Column(name = "curatorName")
	private String curatorName;
	
	@Column(name = "year")
	private String year;
	
	@Column(name = "user_id")
	private Long userId;

	@Column(name = "is_open")
	private Boolean isOpen;

	@Column(name = "mouth")
	private Integer mouth;
	
	@Column(name = "lesson_library_name")
	private String lessonLibraryName;
	
	public Journal() {
	}

	public Journal(int groupId, String year, Long userId, String curatorName, Boolean isOpen, String lessonLibraryName, Integer mouth) {
		super();
		this.groupId = groupId;
		this.year = year;
		this.userId = userId;
		this.curatorName = curatorName;
		this.isOpen = isOpen;
		this.lessonLibraryName = lessonLibraryName;
		this.mouth = mouth;
	}

	public Integer getMouth() {
		return mouth;
	}

	public void setMouth(Integer mouth) {
		this.mouth = mouth;
	}

	public void changeJournalData(Journal newJournal){
		this.groupId = newJournal.groupId;
		this.year = newJournal.year;
		this.userId = newJournal.userId;
		this.curatorName = newJournal.curatorName;
		this.isOpen = newJournal.isOpen;
		this.lessonLibraryName = newJournal.lessonLibraryName;
		this.mouth = newJournal.getMouth();
	}
	
	public String getCuratorName() {
		return curatorName;
	}

	public void setCuratorName(String curatorName) {
		this.curatorName = curatorName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getGroupId() {
		return groupId;
	}

	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}


	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Boolean getIsOpen() {
		return isOpen;
	}

	public void setIsOpen(Boolean isOpen) {
		this.isOpen = isOpen;
	}

	public String getLessonLibraryName() {
		return lessonLibraryName;
	}

	public void setLessonLibraryName(String lessonLibraryName) {
		this.lessonLibraryName = lessonLibraryName;
	}
}

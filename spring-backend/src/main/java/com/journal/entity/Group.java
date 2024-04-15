package com.journal.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "groups1")
public class Group {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "group_name")
	private String groupName;
	
	@Column(name = "group_year")
	private int groupYear;
	

	
	public void changeGroupData(Group newGroup){
		this.setGroupName(newGroup.getGroupName());
		this.setGroupYear(newGroup.getGroupYear());
	}
	
	
	public Group() {
		
	}
	
	public Group(String groupName, int groupYear, String groupType) {
		super();
		this.groupName = groupName;
		this.groupYear = groupYear;
	}

	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public int getGroupYear() {
		return groupYear;
	}

	public void setGroupYear(int groupYear) {
		this.groupYear = groupYear;
	}

	
}

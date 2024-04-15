package com.journal.service;

import java.util.List;

import com.journal.entity.Group;

public interface GroupService {

	List<Group> getAllGroups();
	
	Group getGroupById(Long id);
	
	Group saveGroup(Group Group);
	
	void deleteGroupById(Long id);
	
	Group updateGroupById(Long id, Group newGroup);
	
}

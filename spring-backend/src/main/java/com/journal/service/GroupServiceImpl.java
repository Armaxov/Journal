package com.journal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import com.journal.entity.Group;
import com.journal.repository.GroupRepository;

@Service
public class GroupServiceImpl implements GroupService{

	
	private final GroupRepository groupRepository;
	
	@Autowired
	public GroupServiceImpl(GroupRepository groupRepository) {
		this.groupRepository = groupRepository;
	}
	
	@Override
	public List<Group> getAllGroups() {
		return groupRepository.findAll();
	}

	@Override
	public Group getGroupById(Long id) {
		Group group = groupRepository.findById(id)
				.orElseThrow(() -> new ResourceAccessException("Group is not exist with id:" + id));
		return group;
	}

	@Override
	public Group saveGroup(Group group) {
		return groupRepository.save(group);
	}

	@Override
	public void deleteGroupById(Long id) {
		Group group = getGroupById(id);
		groupRepository.delete(group);
	}

	@Override
	public Group updateGroupById(Long id, Group newGroup) {
		Group group = getGroupById(id);
		group.changeGroupData(newGroup);
		return groupRepository.save(group);
	}

}

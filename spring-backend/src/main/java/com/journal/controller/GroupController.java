package com.journal.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.journal.entity.Group;
import com.journal.service.GroupService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class GroupController {

	@Autowired
    public GroupController(GroupService groupService) {
		this.groupService = groupService;
	}
	
	private final GroupService groupService;
	
	@GetMapping("/groups")
	public List<Group> getAllGroups(){
		return groupService.getAllGroups();
	}
	
	@GetMapping("/groups/{id}")
	public Group getGroupById(@PathVariable Long id) {
		Group group = groupService.getGroupById(id);
		return group;
	}
	
	
	@PostMapping("/groups")
	public Group createGroup(@RequestBody Group group) {
		return groupService.saveGroup(group);
	}
	
	@PutMapping("/groups/{id}")
	public ResponseEntity<Group> updateGroup(@PathVariable Long id, @RequestBody Group newGroup){
		return ResponseEntity.ok(groupService.updateGroupById(id, newGroup));
	}
	
	@DeleteMapping("/groups/{id}")
	public ResponseEntity<Group> deleteGroup(@PathVariable Long id){
		groupService.deleteGroupById(id);
		return ResponseEntity.noContent().build();
	}
}

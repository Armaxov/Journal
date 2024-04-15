package com.journal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.journal.entity.Role;
import com.journal.entity.User;
import com.journal.service.RoleServiceImpl;
import com.journal.service.UserDetailsServiceImpl;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class UserController {

	
	private final UserDetailsServiceImpl detailsServiceImpl;
	private final RoleServiceImpl roleServiceImpl;
	
	@Autowired
	public UserController(UserDetailsServiceImpl detailsServiceImpl, RoleServiceImpl roleServiceImpl) {
		this.detailsServiceImpl = detailsServiceImpl;
		this.roleServiceImpl = roleServiceImpl;
	}
	
	@GetMapping("/users/usernames")
	public List<String> getUsernames(){
		return detailsServiceImpl.getUsernameList();
	}
	
	@GetMapping("/users/{id}")
	public String getUsernameById(@PathVariable Long id) {
		return detailsServiceImpl.getUsernameById(id);
	}
	
	@GetMapping("/users/roles/{userId}")
	public String getRoleById(@PathVariable Long userId){
		return detailsServiceImpl.getRoleById(userId);
	}
	
	@GetMapping("/users/roles")
	public List<Role> getRoles(){
		return roleServiceImpl.getRoles();
	}
	
	@PostMapping("/users")
	public User createUser(@RequestBody User user) {
		return detailsServiceImpl.saveUser(user);
	}
	
	@PutMapping("/users/usernames/{username}")
	public void updateUser(@PathVariable String username, @RequestBody User newUser) {
		User user = (User) detailsServiceImpl.loadUserByUsername(username);
		user.setUsername(newUser.getUsername());
		if(newUser.getPassword() != "")
			user.setPassword(newUser.getPassword());
		user.setRole(newUser.getRole());
		detailsServiceImpl.saveUser(user);
	}
	
	@DeleteMapping("/users/usernames/{username}")
	public ResponseEntity<User> deleteUserByName(@PathVariable String username){
		detailsServiceImpl.removeUserByUsername(username);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/users/usernames/{username}")
	public Long getIdByUsername(@PathVariable String username) {
		User findedUser = (User) detailsServiceImpl.loadUserByUsername(username);
		return detailsServiceImpl.getId(findedUser);
	}
}

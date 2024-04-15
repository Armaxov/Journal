package com.journal.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.journal.entity.User;
import com.journal.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService, UserService{

	private final UserRepository userRepository;
	private final RoleServiceImpl roleServiceImpl;
	
	@Autowired
	public UserDetailsServiceImpl(UserRepository userRepository, RoleServiceImpl roleServiceImpl) {
		this.userRepository = userRepository;
		this.roleServiceImpl = roleServiceImpl;
	}

	@Override
	public UserDetails loadUserByUsername(String username) {
		List<User> users = userRepository.findAll();
		for (User user : users) {
			if(user.getUsername().equals(username)) {
				return user;
			}
		}
		return null;
	}
	
	@Override
	public List<String> getUsernameList(){
		List<User> users = userRepository.findAll();
		ArrayList<String> result = new ArrayList<String>();
		for (User user : users) {
			result.add(user.getUsername());
		}
		return result;
	}
	
	public String getRoleById(Long userId){
		User findedUser = userRepository.findById(userId).get();
		return roleServiceImpl.getRoleById(findedUser.getRole()).getRole();
	}
	
	public User saveUser(User user) {
		return userRepository.save(user);
	}
	
	public Long getId(User user) {
		return user.getId();
	}
	
	public String getUsernameById(Long id) {
		return userRepository.findById(id).get().getUsername();
	}
	
	public void removeUserByUsername(String username) {
		User findedUser = null;
		List<User> users = userRepository.findAll();
		for (User user : users) {
			if(user.getUsername().equals(username))
				findedUser = user;
		}
		if(findedUser != null)
			userRepository.delete(findedUser);
	}

}

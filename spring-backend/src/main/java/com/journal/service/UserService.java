package com.journal.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;

public interface UserService{

	UserDetails loadUserByUsername(String username);
	public List<String> getUsernameList();
}

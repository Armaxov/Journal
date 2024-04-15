package com.journal.service;

import java.util.List;

import com.journal.entity.Role;

public interface RoleService {

	List<Role> getRoles();
	Role getRoleById(Long id);
	Role getRoleByName(String role);
}

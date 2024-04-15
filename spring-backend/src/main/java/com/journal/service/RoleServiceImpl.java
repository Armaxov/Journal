package com.journal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.journal.entity.Role;
import com.journal.repository.RoleRepository;

@Service
public class RoleServiceImpl implements RoleService{

	private final RoleRepository roleRepository;
	
	@Autowired
	public RoleServiceImpl(RoleRepository roleRepository) {
		this.roleRepository = roleRepository;
	}

	@Override
	public List<Role> getRoles() {
		return roleRepository.findAll();
	}

	@Override
	public Role getRoleById(Long id) {
		return roleRepository.findById(id).get();
	}

	@Override
	public Role getRoleByName(String role) {
		List<Role> roles = getRoles();
		for (Role r : roles) {
			if(r.getRole().equals(role))
				return r;
		}
		return null;
	}

}

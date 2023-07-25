package com.notlix.back.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notlix.back.models.Role;
import com.notlix.back.repositories.RoleRepo;

@Service
public class RoleService {
	private final RoleRepo roleRepo;

	@Autowired
	public RoleService(RoleRepo roleRepo) {
		this.roleRepo = roleRepo;
	}

	public Role addRol(Role role) {
		return roleRepo.save(role);
	}
	
	public List<Role> findAllRoles(){
		return roleRepo.findAll();
	}
	
	public Role UpdateRole(Role role) {
		return roleRepo.save(role);
	}
	
	public Role findRoleByName(String name) {
		return roleRepo.findRoleByName(name);
	}
	
	public Role findRoleById(Long id) {
		return roleRepo.findRoleById(id);
	}
	
	/*public void deleteRoleById(Long id) {
		 roleRepo.deleteById(id);
	}*/
}

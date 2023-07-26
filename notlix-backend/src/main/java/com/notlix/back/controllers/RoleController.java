package com.notlix.back.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notlix.back.dtos.RoleDTO;
import com.notlix.back.models.Role;
import com.notlix.back.services.RoleService;

@RestController
@RequestMapping("/role")
@CrossOrigin(origins = "http://localhost:4200")
public class RoleController {
	
	private final RoleService roleService;
	
	@Autowired
	public RoleController(RoleService roleService) {
		this.roleService = roleService;
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Role>> findAllRoles(){
		List<Role> roles = roleService.findAllRoles();
		return new ResponseEntity<>(roles, HttpStatus.OK);
	}
	
	@PostMapping("/add")
	public ResponseEntity<RoleDTO> addRole(){
		Role userRole = new Role();
		Role adminRole = new Role();
		
		userRole.setId((long) 1);
		userRole.setName("user");
		
		adminRole.setId((long) 2);
		userRole.setName("admin");
		
		Role newUserRole = roleService.addRol(adminRole);
		Role newAdminRole =roleService.addRol(userRole);
		
		RoleDTO rolesDTO = new RoleDTO();
		rolesDTO.setNewAdminRole(newAdminRole);
		rolesDTO.setNewUserRole(newUserRole);
		
		return new ResponseEntity<RoleDTO>(rolesDTO,HttpStatus.CREATED);
	}
	
	@GetMapping("/find/{id}")
	public ResponseEntity<Role> findRoleById(
			@PathVariable("id") Long id
			){
		Role role = roleService.findRoleById(id);
		return new ResponseEntity<Role> (role, HttpStatus.OK);
	}
	
	/*@PutMapping("/update")
	public ResponseEntity<Role> updateRole(
			@RequestBody Role role
			){
		Role roleUpdated = roleService.UpdateRole(role);
		return new ResponseEntity<Role> (roleUpdated, HttpStatus.OK);
	}*/

}

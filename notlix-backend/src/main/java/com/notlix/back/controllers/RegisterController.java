package com.notlix.back.controllers;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.notlix.back.dtos.RegisterDTO;
import com.notlix.back.models.Role;
import com.notlix.back.models.User;
import com.notlix.back.services.RoleService;
import com.notlix.back.services.UserService;

@RestController
public class RegisterController {

	@Autowired
	private UserService userService; 
	
	@Autowired
	private RoleService roleService;
	
	

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody RegisterDTO userData){
	
		if(userData.getEmail() == "" || userData.getEmail() == null || 
				userData.getPwd() == "" || userData.getPwd() == null || 
				userData.getName() == "" || userData.getName() == null || 
				userData.getTelephone() == "" || userData.getTelephone() == null ) {
			
			return new ResponseEntity<>("Todos los campos son obligatorios", HttpStatus.BAD_REQUEST);
		}
		else {
			String hashedpwd = BCrypt.hashpw(userData.getPwd(), BCrypt.gensalt());
			User user = new User((long) 0, userData.getEmail(), userData.getTelephone(),userData.getName(), hashedpwd);
			
			Role rol = roleService.findRoleByName("user");
			user.setRole(rol);
			
			userService.addUser(user);
			
			return new ResponseEntity<>("Usuario registrado", HttpStatus.CREATED);
		}
	}
}

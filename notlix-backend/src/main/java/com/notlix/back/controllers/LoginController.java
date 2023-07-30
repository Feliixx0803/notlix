package com.notlix.back.controllers;

import org.mindrot.jbcrypt.BCrypt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.notlix.back.dtos.LoginDTO;
import com.notlix.back.dtos.UserDTO;
import com.notlix.back.models.User;
import com.notlix.back.services.UserService;

@RestController
public class LoginController {

	@Autowired
	private UserService userService;
	
	@PostMapping("/login")
	public ResponseEntity<UserDTO> login(@RequestBody LoginDTO userData){
		
		if (userData.getEmail() == "" || userData.getPwd() == "") {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		User user = userService.findUserByEmail(userData.getEmail());
		UserDTO userDTO = new UserDTO();
		userDTO.setName(user.getName());
		
		if(userDTO.getName() == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		else if(!BCrypt.checkpw(userData.getPwd(), user.getPwd())) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		else {
			return new ResponseEntity<>(userDTO, HttpStatus.OK);
		}
	}
}


package com.notlix.back.controllers;

import java.util.ArrayList;
import java.util.List;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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

import com.notlix.back.dtos.NoteDTO;
import com.notlix.back.dtos.TaskDTO;
import com.notlix.back.models.Note;
import com.notlix.back.models.Role;
import com.notlix.back.models.Task;
import com.notlix.back.models.User;
import com.notlix.back.services.RoleService;
import com.notlix.back.services.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	
	private final UserService userService;
	private final RoleService roleService;
	
	@Autowired
	public UserController(UserService userService, RoleService roleService) {
		this.userService = userService;
		this.roleService = roleService;
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<User>> findAllUsers(){
		List <User> users = userService.findAllUsers();
		return new ResponseEntity<>(users,HttpStatus.OK);
	}

	@GetMapping("/find/{id}")
	public ResponseEntity<User> findUserById(
			@PathVariable("id") Long id
			){
		User user = userService.findUserById(id);
		return new ResponseEntity<>(user,HttpStatus.OK);
	}
	
	@PostMapping("/add")
	public ResponseEntity<String> addUser(
			@RequestBody User user
			){
		try {
			if (user.getEmail() == "" || user.getName() == "" || user.getPwd() == "" || user.getTelephone() == "") {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
			
			Role role = roleService.findRoleById(user.getRole().getId());
			user.setRole(role);
			
			//HASH PWD:
			String passwd = user.getPwd();
			user.setPwd(BCrypt.hashpw(passwd, BCrypt.gensalt()));
			
			User newUser = userService.addUser(user);
			return new ResponseEntity<>("" + newUser.getId(), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<User> updateUser(
			@RequestBody User userData,
			@PathVariable("id") Long id
			){
		User user = userService.findUserById(id);
		user.setName(userData.getName());
		user.setEmail(userData.getEmail());
		user.setTelephone(userData.getTelephone());
		
		User userUpdate = userService.updateUser(user);
		
		return new ResponseEntity<>(userUpdate, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteUser(
			@PathVariable("id") Long id
			){
		userService.deleteUserById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/getUserNotes/{email}")
	public ResponseEntity<List<NoteDTO>> getUserNotes(
			@PathVariable("email") String email){
		User user = userService.findUserByEmail(email);
		List<NoteDTO> NotesList = new ArrayList<>();
		
		for(Note n :user.getNotes()) {
			NotesList.add(new NoteDTO(n.getTitle(),n.getContent()));
		}
		return new ResponseEntity<>(NotesList,HttpStatus.OK);
	}
	
	@GetMapping("/getUserTasks/{email}")
	public ResponseEntity<List<TaskDTO>> getUserTasks(
			@PathVariable("email") String email){
		User user = userService.findUserByEmail(email);
		List<TaskDTO> tasksList = new ArrayList<>();
		
		for(Task t :user.getTasks()) {
			tasksList.add(new TaskDTO(t.getName(),t.isDone()));
		}
		return new ResponseEntity<>(tasksList,HttpStatus.OK);
	}
}

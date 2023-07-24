package com.notlix.back.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notlix.back.models.User;
import com.notlix.back.repositories.UserRepo;

@Service
public class UserService {
	private final UserRepo userRepo;

	@Autowired
	public UserService(UserRepo userRepo) {
		this.userRepo = userRepo;
	}
	
	public User addUser(User user) {
		return userRepo.save(user);
	}
	
	public List<User> findAllUsers(){
		return userRepo.findAll();
	}
	
	public User updateUser(User user) {
		return userRepo.save(user);
	}
	
	
	public User findUserById(Long id) {
		return userRepo.findUserById(id);
	}
	
	public User findUserByName(String name) {
		return userRepo.findUserByName(name);
	}
	
	public User findUserByEmail(String email) {
		return userRepo.findUserByEmail(email);
	}

	public void deleteUserById(Long id) {
		userRepo.deleteById(id);
	}
}

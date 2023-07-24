package com.notlix.back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notlix.back.models.User;

public interface UserRepo extends JpaRepository<User, Long>{
	User findUserByEmail(String email);
	User findUserByName(String name);
	User findUserById(Long id);
}

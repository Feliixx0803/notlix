package com.notlix.back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notlix.back.models.Role;

public interface RoleRepo extends JpaRepository<Role, Long> {
	Role findRoleByName(String name);
}

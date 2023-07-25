package com.notlix.back.dtos;

import java.io.Serializable;

import com.notlix.back.models.Role;

public class RoleDTO implements Serializable{
	private Role newUserRole;
	private Role newAdminRole;
	
	public RoleDTO() {
		// TODO Auto-generated constructor stub
	}

	public RoleDTO(Role newUserRole, Role newAdminRole) {
		super();
		this.newUserRole = newUserRole;
		this.newAdminRole = newAdminRole;
	}

	public Role getNewUserRole() {
		return newUserRole;
	}

	public void setNewUserRole(Role newUserRole) {
		this.newUserRole = newUserRole;
	}

	public Role getNewAdminRole() {
		return newAdminRole;
	}

	public void setNewAdminRole(Role newAdminRole) {
		this.newAdminRole = newAdminRole;
	}
	
}

package com.notlix.back.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="Role")
public class Role{
 	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;

    private String name;
    
    
    @OneToMany(mappedBy = "role")
    @JsonManagedReference
    private Collection<User> users;
    

	public Role() {
		this.name = "user";
		this.users = new ArrayList<User>();
	}
	
	/*public Role(Long id, String name) {
	super();
	this.id = id;
	this.name = name;
}*/


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public Collection<User> getUsers() {
		return users;
	}


	public void setUsers(Collection<User> users) {
		this.users = users;
	}
}

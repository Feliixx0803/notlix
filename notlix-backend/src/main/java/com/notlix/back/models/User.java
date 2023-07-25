package com.notlix.back.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="User")
public class User{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(nullable=false, updatable=false)
	private Long id;
	
	@Column(unique = true)
	private String email;
	
	private String telephone;
    private String name;
    private String pwd;
    
    @JsonIgnore
    @ManyToOne
    private Role role;
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Collection<Task> tasks;
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Collection<Note> notes;
	
    public User() {
    	this.tasks = new ArrayList<Task>();
    	this.notes = new ArrayList<Note>();
	}

	public User(Long id, String email, String telephone, String name, String pwd) {
		super();
		this.id = id;
		this.email = email;
		this.telephone = telephone;
		this.name = name;
		this.pwd = pwd;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Collection<Task> getTasks() {
		return tasks;
	}

	public void setTasks(Collection<Task> tasks) {
		this.tasks = tasks;
	}

	public Collection<Note> getNotes() {
		return notes;
	}

	public void setNotes(Collection<Note> notes) {
		this.notes = notes;
	}
	
	

}

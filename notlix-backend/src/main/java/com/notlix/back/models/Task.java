package com.notlix.back.models;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="Task")
public class Task implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
	private Long id;
	
	@Column(unique = true)
	private String name;
	
	
	private boolean isDone;
	
	@ManyToOne
	@JsonBackReference
	private User user;
	
	public Task() {
	}

	public Task(Long id, String name) {
		super();
		this.id = id;
		this.name = name;
		this.isDone = false;
	}
	

	public Task(Long id, String name, boolean isDone) {
		super();
		this.id = id;
		this.name = name;
		this.isDone = isDone;
	}

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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public boolean isDone() {
		return isDone;
	}

	public void setDone(boolean isDone) {
		this.isDone = isDone;
	}
	
	

}

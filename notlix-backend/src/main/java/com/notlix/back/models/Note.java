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
@Table(name="Note")
public class Note implements Serializable{
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
	
	private String title;
	private String content;
	
	
	@ManyToOne
	@JsonBackReference
	private User user;
	
	
	public Note() {
	}


	public Note(Long id, String title, String content) {
		super();
		this.id = id;
		this.title = title;
		this.content = content;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}
	
	

}

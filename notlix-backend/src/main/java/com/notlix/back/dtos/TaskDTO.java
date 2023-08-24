package com.notlix.back.dtos;

public class TaskDTO {
	private Long id;
	private String name;
	private boolean isDone;

	public TaskDTO() {
		this.isDone = false;
	}

	public TaskDTO(Long id, String name, boolean isDone) {
		super();
		this.id = id;
		this.name = name;
		this.isDone = isDone;
	}

	public TaskDTO(String name, boolean isDone) {
		super();
		this.name = name;
		this.isDone = isDone;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isDone() {
		return isDone;
	}

	public void setDone(boolean isDone) {
		this.isDone = isDone;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	

}

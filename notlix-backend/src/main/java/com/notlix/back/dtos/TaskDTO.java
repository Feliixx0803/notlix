package com.notlix.back.dtos;

public class TaskDTO {
	private String name;
	private boolean isDone;

	public TaskDTO() {
		this.isDone = false;
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
	
	

}

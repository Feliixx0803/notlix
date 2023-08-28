package com.notlix.back.dtos;

public class NewTaskDTO {
	private String name;
	private boolean isDone;

	public NewTaskDTO() {
		this.isDone = false;
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

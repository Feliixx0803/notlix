package com.notlix.back.dtos;

public class NoteDTO {

	String title;
	String content;
	
	public NoteDTO() {
		
	}

	public NoteDTO(String title, String content) {
		super();
		this.title = title;
		this.content = content;
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

}

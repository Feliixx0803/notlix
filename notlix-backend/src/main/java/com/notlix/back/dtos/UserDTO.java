package com.notlix.back.dtos;

public class UserDTO {
	private String name;
	private String email;
	private String telephone;



	public UserDTO() {
	}



	public UserDTO(String name, String email, String telephone) {
		super();
		this.name = name;
		this.email = email;
		this.telephone = telephone;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
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

}

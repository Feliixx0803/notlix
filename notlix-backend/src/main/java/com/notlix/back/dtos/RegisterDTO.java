package com.notlix.back.dtos;

public class RegisterDTO {
	
	private String name;
	private String email;
	private String telephone;
	private String pwd;

	public RegisterDTO() {
	}

	
	public RegisterDTO(String name, String email, String telephone, String pwd) {
		super();
		this.name = name;
		this.email = email;
		this.telephone = telephone;
		this.pwd = pwd;
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


	public String getPwd() {
		return pwd;
	}


	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	
	

}

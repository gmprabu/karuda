package com.karuda.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class SignUpRequest {
	
	private long id;
	
    @NotBlank
    @Size(min = 3, max = 40)
    private String name;

    @NotBlank
    @Size(min = 3, max = 15)
    private String username;

    @NotBlank
    @Email
    private String email;


   //@Size(min = 6, max = 20)
    private String password;
    
    @NotBlank
    private String role;
}
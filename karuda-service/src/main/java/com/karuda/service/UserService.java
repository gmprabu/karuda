package com.karuda.service;

import java.util.List;

import com.karuda.domain.User;
import com.karuda.model.SignUpRequest;

public interface UserService {

	List<User> getAll();

	User createUser(SignUpRequest signUpRequest);
	
	User updateUser(SignUpRequest signUpRequest);

	void delete(Long id);
	
	boolean checkDuplicateUsername(String name);
	
	boolean checkDuplicateEmail(String email);
}

package com.karuda.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.karuda.domain.User;
import com.karuda.model.ApiResponse;
import com.karuda.model.SignUpRequest;
import com.karuda.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService service;

	@GetMapping
	public List<User> getAll() {
		return service.getAll();
	}
	
	@GetMapping("/{username}")
	public boolean checkUserNameExists(@PathVariable String username) {
		return service.checkDuplicateUsername(username);
	}
	
	@GetMapping("/email/{email}")
	public boolean checkEmailExists(@PathVariable String email) {
		return service.checkDuplicateEmail(email);
	}

	@PostMapping
	public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {

		User result = service.createUser(signUpRequest);
		if (result != null) {
			return ResponseEntity.ok(new ApiResponse(true, "User created successfully"));
		} 
		return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Unable to create user..!"),
				HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@PutMapping
	public ResponseEntity<ApiResponse> updateUser(@Valid @RequestBody SignUpRequest signUpRequest) {
		User result = service.updateUser(signUpRequest);
		if (result != null) {
			return ResponseEntity.ok(new ApiResponse(true, "User updated successfully"));
		}
		return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Unable to find user..!"),
				HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long id) {
		 service.delete(id);
		 return ResponseEntity.ok(new ApiResponse(true, "User deleted successfully"));
	}

}

package com.karuda.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.karuda.domain.Role;
import com.karuda.domain.RoleName;
import com.karuda.domain.User;
import com.karuda.exception.KarudaException;
import com.karuda.model.SignUpRequest;
import com.karuda.repository.RoleRepository;
import com.karuda.repository.UserRepository;
import com.karuda.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;
	
    @Autowired
    PasswordEncoder passwordEncoder;
    
	@Override
	public List<User> getAll() {
		return userRepository.findAll();
	}

	@Override
	public User createUser(SignUpRequest signUpRequest) {
		/*if(userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }*/

        // Creating user's account
        User user = new User(signUpRequest.getName(), signUpRequest.getUsername(),
                signUpRequest.getEmail(), signUpRequest.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole = roleRepository.findByName(RoleName.valueOf(signUpRequest.getRole().toUpperCase()))
                .orElseThrow(() -> new KarudaException("User Role not set."));
        user.setRoles(Collections.singleton(userRole));  
        User result = userRepository.save(user);
        
        return result;

	}

	@Override
	public void delete(Long id) {
		userRepository.deleteById(id);
	}

	@Override
	public User updateUser(SignUpRequest signUpRequest) {
		
		Optional<User> user = userRepository.findById(signUpRequest.getId());
		User existing =user.get();
		if(existing != null) {
			existing.setEmail(signUpRequest.getEmail());
			existing.setUsername(signUpRequest.getUsername());
			existing.setName(signUpRequest.getName());
		 //   Role userRole = roleRepository.findByName(RoleName.valueOf(signUpRequest.getRole().toUpperCase()))
	      //          .orElseThrow(() -> new KarudaException("User Role not set."));

		  //  existing.setRoles(Collections.singleton(userRole));
			return userRepository.saveAndFlush(existing);
		}
		return null;
	}

}

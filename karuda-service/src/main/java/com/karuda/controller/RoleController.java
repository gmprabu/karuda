package com.karuda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.karuda.domain.Role;
import com.karuda.repository.RoleRepository;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

	@Autowired
	private RoleRepository roleRepo;
	
	@GetMapping
	public List<Role> getAll(){
		return roleRepo.findAll();
	}
}

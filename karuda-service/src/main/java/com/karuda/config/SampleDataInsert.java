package com.karuda.config;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.karuda.domain.Role;
import com.karuda.domain.RoleName;
import com.karuda.domain.User;
import com.karuda.repository.RoleRepository;
import com.karuda.repository.UserRepository;

@Component
public class SampleDataInsert implements CommandLineRunner {

    @Autowired
    private  RoleRepository repo;
    
	@Autowired
	UserRepository userRepository;
	
    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void run(String...args) throws Exception {
    	
    	
    	Role role = new Role();
    	role.setName(RoleName.USER);
    	repo.save(role);
    	role = new Role();
    	role.setName(RoleName.ADMIN);
    	repo.save(role);
    	role = new Role();
    	role.setName(RoleName.SUPER_ADMIN);
    	repo.save(role);
    	
    	Optional<Role> roleNew = repo.findByName(RoleName.ADMIN);
    	
    	 Set<Role> set = new HashSet<>();
    	 set.add(roleNew.get());
    	User user = new User();
    	
    	user.setName("Prabu");
    	user.setEmail("prabu@gmail.com");
    	user.setUsername("admin");
    	user.setPassword(passwordEncoder.encode("admin"));
    	user.setRoles(set);
    	
    	userRepository.save(user);
    }
}
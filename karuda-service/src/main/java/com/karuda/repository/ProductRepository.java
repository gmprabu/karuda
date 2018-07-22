package com.karuda.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.karuda.domain.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
	
	Optional<Product> findById(Long id);
	 Optional<Product> findByName(String name);
}

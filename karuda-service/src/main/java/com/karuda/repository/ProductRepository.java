package com.karuda.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.karuda.domain.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}

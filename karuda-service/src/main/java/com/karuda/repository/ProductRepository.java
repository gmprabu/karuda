package com.karuda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.karuda.domain.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

}

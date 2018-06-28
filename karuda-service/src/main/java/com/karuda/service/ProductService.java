package com.karuda.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.karuda.domain.Product;

public interface ProductService {
	
	List<Product> getProducts();
	
	Product addProduct(String obj ,MultipartFile file);
	
	Product updateProduct(Product prod);
	
	void removeProduct(Long id);

}

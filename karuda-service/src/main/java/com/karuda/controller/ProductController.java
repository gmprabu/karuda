package com.karuda.controller;

import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.karuda.domain.Product;
import com.karuda.model.ApiResponse;
import com.karuda.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

	@Autowired
	ProductService service;
	
	@GetMapping
	public List<Product> getAllProducts(){
		return service.getProducts();
	}
	
	@PostMapping
	public ResponseEntity<ApiResponse> addProduct(@RequestPart("product") String product,@RequestPart("file") MultipartFile file) {
		
		System.out.println(file);	
		Product result =service.addProduct(product, file);
		
		if (result != null) {
			return ResponseEntity.ok(new ApiResponse(true, "Product created successfully"));
		} 
		return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Unable to create product..!"),
				HttpStatus.INTERNAL_SERVER_ERROR);
	}
}

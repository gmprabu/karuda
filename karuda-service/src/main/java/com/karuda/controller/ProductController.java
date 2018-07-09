package com.karuda.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.karuda.domain.Price;
import com.karuda.domain.Product;
import com.karuda.model.ApiResponse;
import com.karuda.model.StockUpdateRequest;
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
	public ResponseEntity<ApiResponse> addProduct(@RequestPart("product") String product,
			@RequestPart("file") MultipartFile file) {
		
		Product result =service.addProduct(product, file);
		if (result != null) {
			return ResponseEntity.ok(new ApiResponse(true, "Product created successfully"));
		} 
		return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Unable to create product..!"),
				HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@PutMapping
	public ResponseEntity<ApiResponse> updateProduct(@RequestBody Product product) {
		
		Product result =service.updateProduct(product);
		if (result != null) {
			return ResponseEntity.ok(new ApiResponse(true, "Product updated successfully"));
		} 
		return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Unable to update product..!"),
				HttpStatus.INTERNAL_SERVER_ERROR);
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Long id) {
		 service.removeProduct(id);
		 return ResponseEntity.ok(new ApiResponse(true, "Product deleted successfully"));
	}
	
	@PostMapping("/stockUpdate/{id}")
	public ResponseEntity<ApiResponse> stockUpdateProduct(@PathVariable Long id,@RequestBody StockUpdateRequest product) {
		
		Product result =service.updateProductStock(product);
		if (result != null) {
			return ResponseEntity.ok(new ApiResponse(true, "Product stock updated successfully"));
		} 
		return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Unable to update product stock..!"),
				HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@DeleteMapping("/price/{id}")
	public ResponseEntity<ApiResponse> deletePrice(@PathVariable Long id) {
		 service.removePrice(id);
		 return ResponseEntity.ok(new ApiResponse(true, "Price deleted successfully"));
	}
	
	@PutMapping("/price")
	public ResponseEntity<ApiResponse> updatePrice(@RequestBody Price price) {
		
		Price result =service.updatePrice(price);
		if (result != null) {
			return ResponseEntity.ok(new ApiResponse(true, "Price updated successfully"));
		} 
		return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Unable to update price..!"),
				HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}

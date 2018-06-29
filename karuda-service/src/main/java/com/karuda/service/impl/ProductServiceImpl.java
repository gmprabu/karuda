package com.karuda.service.impl;

import java.io.IOException;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.karuda.domain.Product;
import com.karuda.domain.StockAudit;
import com.karuda.domain.UnitType;
import com.karuda.domain.UnitTypeName;
import com.karuda.exception.KarudaException;
import com.karuda.repository.ProductRepository;
import com.karuda.repository.StockAuditRepository;
import com.karuda.repository.UnitsRepository;
import com.karuda.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	ProductRepository repository;

	@Autowired
	UnitsRepository unitRepository;
	
	@Autowired
	StockAuditRepository auditRepo;

	@Override
	public List<Product> getProducts() {
		return repository.findAll();
	}

	@Override
	public Product addProduct(String obj, MultipartFile file) {

		Product product =constructProduct( obj, file) ;
		if(product != null) {
			product = repository.save(product);
			
			if(product != null) {
				addStockAudit(product);
			}
		}
		return product;
	}

	@Override
	public Product updateProduct(Product product) {		
		
		UnitType type = unitRepository.findByType(product.getUnitType().getType())
				.orElseThrow(() -> new KarudaException("unit type not set."));
		product.setUnitType(type);
		return  repository.save(product);
	}

	@Override
	public void removeProduct(Long id) {
		repository.deleteById(id);

	}
	
	private void addStockAudit(Product prod) {
		StockAudit audit = new StockAudit();
		audit.setProduct(prod);
		audit.setQuantity(prod.getStock());
		auditRepo.save(audit);
	}

	private Product constructProduct(String obj, MultipartFile file) {
		JSONObject productObj = null;
		Product product = null;
		try {
			productObj = new JSONObject(obj);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		if (productObj != null) {

			product = new Product();
			if(!productObj.getString("id").isEmpty()) {
				product.setId(productObj.getLong("id"));
			}
			product.setName(productObj.getString("name"));
			product.setDescription(productObj.getString("description"));
			product.setStock(productObj.getInt("stock"));
			product.setCategory(productObj.getString("category"));
			UnitType type = unitRepository.findByType(UnitTypeName.valueOf(productObj.getString("unitType")))
					.orElseThrow(() -> new KarudaException("unit type not set."));
			product.setUnitType(type);
			try {
				product.setImage(file.getBytes());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return product;
	}
}

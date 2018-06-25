package com.karuda.service.impl;

import java.io.IOException;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.karuda.domain.Product;
import com.karuda.domain.UnitType;
import com.karuda.domain.UnitTypes;
import com.karuda.exception.KarudaException;
import com.karuda.repository.ProductRepository;
import com.karuda.repository.UnitsRepository;
import com.karuda.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	ProductRepository repository;
	
	@Autowired
	UnitsRepository unitRepository;

	@Override
	public List<Product> getProducts() {
		return repository.findAll();
	}

	@Override
	public Product addProduct(String obj ,  MultipartFile  file) {
	
		JSONObject productObj = null;
		try {
			productObj = new JSONObject(obj);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(productObj != null) {
			
			Product product = new Product();
			
			product.setName(productObj.getString("name"));
			product.setDescription(productObj.getString("description"));
			product.setStock(productObj.getInt("stock"));
			
			UnitType type = unitRepository.findByType(UnitTypes.valueOf(productObj.getString("type")))
		                .orElseThrow(() -> new KarudaException("unit type not set."));
			product.setType( type);
			try {
				product.setImage(file.getBytes());
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			return repository.save(product);
		}
		return null;
	}

	@Override
	public Product updateProduct(String obj , MultipartFile file) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void removeProduct(Long id) {
		repository.deleteById(id);
		
	}
}

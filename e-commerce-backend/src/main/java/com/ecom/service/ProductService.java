package com.ecom.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ecom.dao.ProductDao;
import com.ecom.entities.Product;

@Service
public class ProductService {
	
	@Autowired
	private ProductDao productDao;
	public Product addNewProduct(Product product) {
		return productDao.save(product);
	}
	

	public List<Product> findAllProducts(){
		return productDao.findAll();
	}

	public void deleteProductDetails(Integer productId) {
		// TODO Auto-generated method stub
		 productDao.deleteById(productId);;
	}
	
	public Optional<Product> getProducDetailsById(Integer productId) {
		return this.productDao.findById(productId);
	}
	
	public List<Product> getProducDetails(boolean isSingleProductCheckOut, Integer productId) {
		if(isSingleProductCheckOut) {
			
			List<Product> list = new ArrayList<>();
			Product product = productDao.findById(productId).get();
			list.add(product);
			return list;
		}else {
			
		}
		return new ArrayList<>();
		}
}

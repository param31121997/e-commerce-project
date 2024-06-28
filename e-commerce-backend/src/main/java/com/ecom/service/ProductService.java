package com.ecom.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ecom.configuration.JwtRequestFilter;
import com.ecom.dao.CartRepository;
import com.ecom.dao.ProductRepository;
import com.ecom.dao.UserDao;
import com.ecom.entities.Cart;
import com.ecom.entities.Product;
import com.ecom.entities.User;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private CartRepository cartRepository;
	public Product addNewProduct(Product product) {
		return productRepository.save(product);
	}
	

	 public List<Product> findAllProducts(Pageable pageable, String searchKey) {
		 if(searchKey.equals("")) {
			 return productRepository.findAll(pageable);
		 }else {
			 return productRepository.findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase
					 (searchKey, searchKey, pageable);
		 }
	        
	    }
	 
	 
	public void deleteProductDetails(Integer productId) {
		// TODO Auto-generated method stub
		 productRepository.deleteById(productId);;
	}
	
	public Optional<Product> getProducDetailsById(Integer productId) {
		return this.productRepository.findById(productId);
	}
	
	public List<Product> getProducDetails(boolean isSingleProductCheckOut, Integer productId) {
		if(isSingleProductCheckOut && productId != 0) {
			
			List<Product> list = new ArrayList<>();
			Product product = productRepository.findById(productId).get();
			list.add(product);
			return list;
		}else {
			String username = JwtRequestFilter.CURRENT_USER;
			User user = userDao.findByUserName(username).get();
			List<Cart> cartResults = cartRepository.findByUser(user);
			
			return cartResults.stream().map(x-> x.getProduct()).collect(Collectors.toList());	
		}
	}
}

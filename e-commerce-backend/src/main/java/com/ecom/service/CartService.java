package com.ecom.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.configuration.JwtRequestFilter;
import com.ecom.dao.CartRepository;
import com.ecom.dao.ProductRepository;
import com.ecom.dao.UserDao;
import com.ecom.entities.Cart;
import com.ecom.entities.Product;
import com.ecom.entities.User;

@Service
public class CartService {

	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private UserDao userDao;
	
	public Cart addToCartProduct(Integer productId) {
		Product product = productRepository.findById(productId).get();
		String username = JwtRequestFilter.CURRENT_USER;
		User user= null;
		if(username != null) {
			user = userDao.findByUserName(username).get();

		}
		
		List<Cart> cartList = cartRepository.findByUser(user);
		List<Cart> filteredList = cartList.stream().filter(x -> x.getProduct().getId() == productId).collect(Collectors.toList());
		if(filteredList.size() > 0) {
			return null;
		}
		if(product != null && user != null) {
			Cart cart = new Cart(product, user);
			return cartRepository.save(cart);
		}
		return null;
	}
	
	public List<Cart>  getCartDetails(){
		String username = JwtRequestFilter.CURRENT_USER;
		User user = userDao.findByUserName(username).get();
		return cartRepository.findByUser(user);
				
	}
	
	public void deleteCartItem(Integer cartId) {
		cartRepository.deleteById(cartId);
	}
 }

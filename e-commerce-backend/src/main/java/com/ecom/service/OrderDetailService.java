package com.ecom.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.configuration.JwtRequestFilter;
import com.ecom.dao.OrderDetailDao;
import com.ecom.dao.ProductDao;
import com.ecom.dao.UserDao;
import com.ecom.entities.OrderDetail;
import com.ecom.entities.OrderInput;
import com.ecom.entities.OrderProductQuantity;
import com.ecom.entities.Product;
import com.ecom.entities.User;

@Service
public class OrderDetailService {

	private static final String ORDER_PLACED = "Placed";
	
	@Autowired
	private OrderDetailDao orderDetailDao;
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private UserDao userDao;
	
	
	
	public OrderDetail placeOrder(OrderInput orderInput) throws Exception{
		
		
		List<OrderProductQuantity> productQuantities = orderInput.getOrderProductQuantityList();
		
		String currentUser = JwtRequestFilter.CURRENT_USER;
		
		User user = userDao.findById(currentUser).get();
		
		for(OrderProductQuantity o:productQuantities) {
			Product product = productDao.findById(o.getProductId()).get();
			OrderDetail orderDetail = new OrderDetail(
					orderInput.getFullName(),
					orderInput.getFullAddress(),
					orderInput.getContactNumber(),
					orderInput.getAlternateContactNumber(),
					ORDER_PLACED,
					product.getProductActualPrice()*o.getQuantity(),
					product, 
					user);
			return orderDetailDao.save(orderDetail);
		}
		return null;
		 
	}
}

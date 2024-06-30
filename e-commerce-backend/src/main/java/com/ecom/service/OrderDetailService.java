package com.ecom.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecom.configuration.JwtRequestFilter;
import com.ecom.dao.CartRepository;
import com.ecom.dao.OrderRepository;
import com.ecom.dao.ProductRepository;
import com.ecom.dao.UserDao;
import com.ecom.entities.Cart;
import com.ecom.entities.OrderDetail;
import com.ecom.entities.OrderInput;
import com.ecom.entities.OrderProductQuantity;
import com.ecom.entities.Product;
import com.ecom.entities.User;

@Service
public class OrderDetailService {

	private static final String ORDER_PLACED = "Placed";
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private CartRepository cartRepository;
	
	public OrderDetail placeOrder(OrderInput orderInput, boolean isCartCheckout) throws Exception{
		
		
		List<OrderProductQuantity> productQuantities = orderInput.getOrderProductQuantityList();
		
		String currentUser = JwtRequestFilter.CURRENT_USER;
		
		User user = userDao.findByUserName(currentUser).get();
		
		for(OrderProductQuantity o:productQuantities) {
			Product product = productRepository.findById(o.getProductId()).get();
			OrderDetail orderDetail = new OrderDetail(
					orderInput.getFullName(),
					orderInput.getFullAddress(),
					orderInput.getContactNumber(),
					orderInput.getAlternateContactNumber(),
					ORDER_PLACED,
					product.getProductActualPrice()*o.getQuantity(),
					product, 
					user);
			
			if(!isCartCheckout) {
				List<Cart> carts= cartRepository.findByUser(user);
				carts.stream().forEach(x ->cartRepository.deleteById(x.getCartId()));
			}
			return orderRepository.save(orderDetail);
		}
		
//		empty the cart
		
		return null;
		 
	}
	
	public List<OrderDetail> getOrderDetails() {
		String currentuser = JwtRequestFilter.CURRENT_USER;
		User user = userDao.findByUserName(currentuser).get();
		return orderRepository.findByUser(user);		
	}

	public List<OrderDetail> getAllOrderDetails() {
		// TODO Auto-generated method stub
		List<OrderDetail> listOrderDetails = new ArrayList<>();
		 orderRepository.findAll().forEach(x -> listOrderDetails.add(x));
		 return listOrderDetails;
	} 
	
	public void changeOrderStatus(Integer orderId) {
		OrderDetail orderDetails  = orderRepository.findById(orderId).get();
		if(orderDetails != null) {
			orderDetails.setOrderStatus("Delivered");
		    orderRepository.save(orderDetails);
		}
	}
}

package com.ecom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.entities.OrderDetail;
import com.ecom.entities.OrderInput;
import com.ecom.exception.OrderSaveException;
import com.ecom.service.OrderDetailService;

@RestController
public class OrderDetailController {

	@Autowired
	private OrderDetailService orderDetailService;
	
	@PreAuthorize("hasRole('User')")
	@PostMapping("/placeOrder/{isCartCheckout}")
	public ResponseEntity<?> placeOrder(@RequestBody OrderInput orderInput, @PathVariable(name="isCartCheckout") boolean isCartCheckout) {
		try {
			 OrderDetail savedOrder	= orderDetailService.placeOrder(orderInput, isCartCheckout);
			return ResponseEntity.ok(savedOrder);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			throw new OrderSaveException("Failed to save order details", e);
		}
	}
	
	@PreAuthorize("hasRole('User')")
	@GetMapping("/getOrderDetails")
	public List<OrderDetail> getOrderDetails() {
		return orderDetailService.getOrderDetails();
	}
	
	@PreAuthorize("hasRole('Admin')")
	@GetMapping("/getAllOrderDetails")
	public List<OrderDetail> getAllOrderDetails() {
		return orderDetailService.getAllOrderDetails();
	}
}

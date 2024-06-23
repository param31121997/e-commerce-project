package com.ecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
	@PostMapping("/placeOrder")
	public ResponseEntity<?> placeOrder(@RequestBody OrderInput orderInput) {
		try {
			 OrderDetail savedOrder	= orderDetailService.placeOrder(orderInput);
			return ResponseEntity.ok(savedOrder);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			throw new OrderSaveException("Failed to save order details", e);
		}
	}
}

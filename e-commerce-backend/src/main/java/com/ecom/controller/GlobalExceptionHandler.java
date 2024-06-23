package com.ecom.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.ecom.exception.OrderSaveException;

@ControllerAdvice
public class GlobalExceptionHandler {

	 @ExceptionHandler(OrderSaveException.class)
	    public ResponseEntity<String> handleOrderSaveException(OrderSaveException ex) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
	    }
}

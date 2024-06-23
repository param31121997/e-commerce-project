package com.ecom.exception;

@SuppressWarnings("serial")
public class OrderSaveException extends RuntimeException {
    
    public OrderSaveException(String message) {
        super(message);
    }
    
    public OrderSaveException(String message, Throwable cause) {
        super(message, cause);
    }
}
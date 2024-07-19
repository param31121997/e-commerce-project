package com.ecom.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionalDetails {

	

	private String orderId;
	
	private String currency;
	
	private Integer amount;
	
	private String key;
}

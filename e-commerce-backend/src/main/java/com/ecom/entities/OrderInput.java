package com.ecom.entities;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderInput {

	private String fullName;
	private String fullAddress;
	private String contactNumber;
	private String alternateContactNumber;
	private String transactionId;
	private List<OrderProductQuantity> orderProductQuantityList;
	
}

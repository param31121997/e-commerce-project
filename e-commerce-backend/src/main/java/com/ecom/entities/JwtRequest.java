package com.ecom.entities;

import lombok.Data;

@Data
public class JwtRequest {

	private String userName;
	private String userPassword;
}

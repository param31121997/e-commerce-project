package com.ecom.controller;

import com.ecom.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {

	private User user;
	private String jwtToken;
}

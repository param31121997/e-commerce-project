package com.ecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.entities.User;
import com.ecom.service.UserService;

import jakarta.annotation.PostConstruct;

@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	@PostConstruct
	private void iniRolesAndUsers() {
		userService.initRoleAndUsers();
	}
	
	@PostMapping("/registerNewUser")
	public User  registerNewUser(@RequestBody User user) {
		return userService.registerNewUser(user);
	}
	
	@GetMapping("/forAdmin")
	@PreAuthorize("hasRole('Admin')")
	public String forAdmin() {
		return "this url is only accsessable for admin";
	}
	

	@GetMapping("/forUser")
	@PreAuthorize("hasAnyRole('Admin', 'User')")
	public String forUser() {
		return "this url is only accsessable for users";
	}
}

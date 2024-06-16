package com.ecom.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecom.dao.RoleDao;
import com.ecom.dao.UserDao;
import com.ecom.entities.Role;
import com.ecom.entities.User;

@Service
public class UserService {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private RoleDao roleDao;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public User registerNewUser(User user) {
		Role role = roleDao.findById("User").get();
		Set<Role> roles =  new HashSet<>();
		roles.add(role);
		user.setRole(roles);
		
		user.setPassword(getEncodedPassword(user.getPassword()));
		return userDao.save(user);
	}
	
	public void initRoleAndUsers() {
		Role adminRole =  new Role();
		adminRole.setRoleName("Admin");
		adminRole.setRoleDesc("Admin role");
		roleDao.save(adminRole);
		
		Role userRole =  new Role();
		userRole.setRoleName("User");
		userRole.setRoleDesc("Default role for newlt created record");
		roleDao.save(userRole);
		
		User adminUser = new User();
		adminUser.setFirstName("admin");
		adminUser.setLastName("admin");
		adminUser.setUserName("admin123");
		adminUser.setPassword(getEncodedPassword("admin@pass"));
		
		Set<Role> adminRoles =  new HashSet<>();
		adminRoles.add(adminRole);
		adminUser.setRole(adminRoles);
		userDao.save(adminUser);
		

	}
	
	public String getEncodedPassword(String password) {
		return passwordEncoder.encode(password);
	}
}

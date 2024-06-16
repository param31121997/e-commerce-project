package com.ecom.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ecom.controller.JwtResponse;
import com.ecom.dao.UserDao;
import com.ecom.entities.JwtRequest;
import com.ecom.entities.User;
import com.ecom.util.JwtUtil;

@Service
public class JwtService implements UserDetailsService{

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private JwtUtil jwtUtil;
	

	private AuthenticationManager authenticationManager;
	
	 @Autowired
	    public void setJwtService(AuthenticationManager authenticationManager) {
	        this.authenticationManager = authenticationManager;
	    }
	
	public JwtResponse creatJwtToken(JwtRequest jwtRequest) throws Exception {
		String userName =  jwtRequest.getUserName();
		String userPassword = jwtRequest.getUserPassword();
		autheticate(userName, userPassword);
	    
		final UserDetails userDetails =  loadUserByUsername(userName);
		String newToken = jwtUtil.generateToken(userDetails.getUsername());
		
		User user = userDao.findById(userName).get();
		
		return new JwtResponse(user, newToken);
		
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = userDao.findById(username).get();
		if(user != null) {
			return new org.springframework.security.core.userdetails.User(
					user.getUserName(),
					user.getPassword(), 
					getAuthorities(user));
			 
		}else {
			throw new UsernameNotFoundException("user is not valid");
		}
	}
	
	private void autheticate(String username, String userPassword) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, userPassword));

		}catch(DisabledException e) {
			throw new Exception("user disabled");
		}catch(BadCredentialsException e) {
			throw new Exception("bad credentials from user");
		}
	}
	
	@SuppressWarnings("unchecked")
	private Set getAuthorities(User user) {
		Set authorities = new HashSet<>();
		user.getRole().forEach(role ->{
			authorities.add(new SimpleGrantedAuthority("ROLE_"+role.getRoleName()));
		});
		return authorities;
	}

}

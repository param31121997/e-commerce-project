package com.ecom.entities;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Entity
@Data
public class User {
	
	@Id
	private String userName;
	
	private String  firstName;
	
	private String lastName;
	
	@ManyToMany(fetch =FetchType.EAGER, cascade=CascadeType.ALL)
	@JoinTable(name="USER_ROLE",
			joinColumns = { @JoinColumn(name = "USER_ID") }, inverseJoinColumns = { @JoinColumn(name = "ROLE_ID") })
	private Set<Role> role;
	
	private String password;

}

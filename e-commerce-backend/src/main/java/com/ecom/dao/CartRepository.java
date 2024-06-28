package com.ecom.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ecom.entities.Cart;
import com.ecom.entities.User;

@Repository
public interface CartRepository extends CrudRepository<Cart, Integer>{

	public List<Cart> findByUser(User user);
}

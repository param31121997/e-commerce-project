package com.ecom.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ecom.entities.OrderDetail;
import com.ecom.entities.User;

@Repository
public interface OrderRepository extends CrudRepository<OrderDetail, Integer>{

	public List<OrderDetail> findByUser(User user);
}

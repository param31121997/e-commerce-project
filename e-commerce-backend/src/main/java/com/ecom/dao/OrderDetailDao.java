package com.ecom.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ecom.entities.OrderDetail;

@Repository
public interface OrderDetailDao extends CrudRepository<OrderDetail, Integer>{

	
}

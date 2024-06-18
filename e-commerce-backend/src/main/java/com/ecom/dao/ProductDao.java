package com.ecom.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecom.entities.Product;

@Repository
public interface ProductDao extends JpaRepository<Product, Integer>{

	Page<Product> findAll(Pageable pageable);
	
	List<Product> findAll();

	
	
}

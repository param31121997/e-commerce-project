package com.ecom.dao;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ecom.entities.User;

@Repository
public interface UserDao extends CrudRepository<User, Long> {

	Optional<User> findByUserName(String userName);

}

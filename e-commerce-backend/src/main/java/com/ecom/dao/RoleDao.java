package com.ecom.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ecom.entities.Role;

@Repository
public interface RoleDao extends CrudRepository<Role, String>{

}

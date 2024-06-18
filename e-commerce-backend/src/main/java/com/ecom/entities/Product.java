package com.ecom.entities;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Data
@Entity
public class Product {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	private String productName;
	
	private String productDescription;
	
	private Double productDiscountPrice;
	
	private Double productActualPrice;
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name="product_images",
	joinColumns = {
			@JoinColumn(name="product_id")},
			inverseJoinColumns = {
			@JoinColumn(name="image_id")}
			)
	private Set<ImageModel> productImages;
	
	

}

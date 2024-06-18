package com.ecom.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="image_model")
@Data
@NoArgsConstructor
public class ImageModel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String name;
	
	private String type;
	
	@Column(length = 50000000)
	private byte[] pictureByte;

	public ImageModel(String name, String type, byte[] pictureByte) {
		this.name = name;
		this.type = type;
		this.pictureByte = pictureByte;
	}
	
	
	
	
}

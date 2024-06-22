package com.ecom.controller;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.ecom.entities.ImageModel;
import com.ecom.entities.Product;
import com.ecom.service.ProductService;

@RestController
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@PreAuthorize("hasRole('Admin')")
	@PostMapping(value="/addNewProduct", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public Product addNewProduct(@RequestPart("product") Product product,
								@RequestPart("imageFile") MultipartFile[] file){
		try {
			Set<ImageModel> images = uploadImage(file);
			product.setProductImages(images);
			return productService.addNewProduct(product);
		}catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	
	public Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException {
		
		Set<ImageModel> imageModels = new HashSet<>();
		for(MultipartFile file : multipartFiles) {
			ImageModel imageModel =  new ImageModel(
					file.getOriginalFilename(),
					file.getContentType(),
					file.getBytes()
			);
			imageModels.add(imageModel);
		}
		return imageModels;
	}
	
	@PreAuthorize("hasRole('Admin')")
	@DeleteMapping("/deleteProductDetails/{productId}")
	public void deleteProductDetails(@PathVariable("productId") Integer producId) {
		 productService.deleteProductDetails(producId);
	}
	
	@PreAuthorize("hasRole('Admin')")
	@DeleteMapping("/deleteAllProducts")
	public void deleteProductDetails() {
		
	}
	
	@GetMapping("/getProductDetailsById/{productId}")
	public Optional<Product> getProducDetailsById(@PathVariable("productId") Integer productId) {
		return this.productService.getProducDetailsById(productId);
	}
//	@PostMapping(value="/getAllProducts")
//	public List<Product> getAllProducts(@RequestBody PageRequestDto pageRequestDto){
//		
//		 Pageable pageable= new PageRequestDto().getPageable(pageRequestDto);
//		  Page<Product> productPage = productService.findAll(pageable);
//		 return productPage;
//	}
//	
//	@PostMapping(value="/getAllProductsList")
//	public Page<Product> getAllProductsList(@RequestBody PageRequestDto pageRequestDto){
//		  List<Product> productList = productService.findAll();
//		  
////		  1 Pageholder
//		  
//		      new PagedListHolder<Product>(productList);
//
//
//     return null;
//	}
	
	
	@GetMapping(value="/getAllProducts")
	public List<Product> getAllProducts(){
		return productService.findAllProducts();
	}
}

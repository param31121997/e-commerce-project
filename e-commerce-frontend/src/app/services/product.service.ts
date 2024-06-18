import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) {

   }

   public addProduct(product:FormData){
    return this.http.post<Product>("http://localhost:8080/addNewProduct", product);
   }

   public getAllProducts(){
    return this.http.get<Product[]>("http://localhost:8080/getAllProducts");
   }

   public deleteProduct(productId:number){
    return this.http.delete("http://localhost:8080/deleteProductDetails/"+productId);
   }
}

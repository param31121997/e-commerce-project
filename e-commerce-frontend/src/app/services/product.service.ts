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
}

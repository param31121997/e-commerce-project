import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/Product.model';
import { OrderDetails } from '../models/order-details.model';
import { MyOrderDetails } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) {

   }

   public addProduct(product:FormData){
    return this.http.post<Product>("http://localhost:8080/addNewProduct", product);
   }

   public getAllProducts(pageNumber, searchKey:string=""){
    return this.http.get<Product[]>("http://localhost:8080/getAllProducts?page="+pageNumber+"&searchKey="+searchKey);
   }

   public deleteProduct(productId:number){
    return this.http.delete("http://localhost:8080/deleteProductDetails/"+productId);
   }
   public getProductById(productId:any){
    return this.http.get<Product>("http://localhost:8080/getProductDetailsById/"+productId);
   }

   public getProductDetails(isSingleProductCheckout:boolean, productId:any){
    return this.http.get<Product[]>("http://localhost:8080/getProducDetails/"+isSingleProductCheckout+"/"+productId);
   }

   public placeOrder(orderDetails:OrderDetails, isCartCheckout){
    return this.http.post("http://localhost:8080/placeOrder/"+isCartCheckout, orderDetails);
   }

   public addToCart(id){
    return this.http.get("http://localhost:8080/addToCart/"+id);
   }

   public getCartDetails(){
    return this.http.get("http://localhost:8080/getCartDetails");
   }

   public deleteCartItem(cartId){
    return this.http.delete("http://localhost:8080/deleteCartItem/"+cartId);
   }

   public getMyOrders():Observable<MyOrderDetails[]>{
    return this.http.get<MyOrderDetails[]>("http://localhost:8080/getOrderDetails");
   }

   
   public getOrdersDetailsForAdmin():Observable<MyOrderDetails[]>{
    return this.http.get<MyOrderDetails[]>("http://localhost:8080/getAllOrderDetails");
   }

   public changeOrderStatus(orderId){
     return this.http.get("http://localhost:8080/changeOrderStatus/"+orderId);
   }
    
  public createTransaction(amount){
    return this.http.get("http://localhost:8080/createTransaction/"+amount);
  }

}

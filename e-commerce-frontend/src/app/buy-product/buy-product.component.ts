import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../models/order-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/Product.model';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.css'
})

export class BuyProductComponent implements OnInit {
 
  orderDetails:OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  }
  
  productDetails:Product[]=[];
  isSingleProductCheckout: string;
 
  constructor(private activatedRoute:ActivatedRoute , private productService:ProductService,
    private router:Router
  ){

  }

  ngOnInit(): void {
   this.productDetails = this.activatedRoute.snapshot.data['productDetails'];

   this.productDetails.forEach(
    x => this.orderDetails.orderProductQuantityList.push({productId:x.id, quantity:2})
   )

   console.log(this.productDetails)
   console.log(this.orderDetails)
  }

  public placeOrder(orderForm:NgForm){
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleCheckout");
    this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckout).subscribe((res) =>{
        console.log(res);

        orderForm.reset();
        this.router.navigate(["/orderConfirm"])
    }, (err:HttpErrorResponse) =>{
      console.log(err)
    })
  }

  public getQuantityForProduct(id){
   const filterProduct=  this.orderDetails.orderProductQuantityList.filter((productQuantity) =>
      productQuantity.productId === id
    );

    return filterProduct[0].quantity;
  }

  public getCalculatedTotal(id, price){
   const quantity = this.getQuantityForProduct(id);
   return quantity*price;
  }

  public onQuantityChange(event, id){
    this.orderDetails.orderProductQuantityList.filter((productQuantity) =>
      productQuantity.productId === id
    )[0].quantity =event.target.value;
  }

  public getTotalAmount(){
    let totalAmount = 0;
    this.orderDetails.orderProductQuantityList.forEach((productQuantity) =>{
     const price = this.productDetails.filter(product => product.id === productQuantity.productId)[0].productDiscountPrice;
     totalAmount = totalAmount+price*productQuantity.quantity;
    });
    return totalAmount;
  }
}

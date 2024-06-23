import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../models/order-details.model';
import { ActivatedRoute } from '@angular/router';
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
 
  constructor(private activatedRoute:ActivatedRoute , private productService:ProductService){

  }

  ngOnInit(): void {
   this.productDetails = this.activatedRoute.snapshot.data['productDetails'];

   this.productDetails.forEach(
    x => this.orderDetails.orderProductQuantityList.push({productId:x.id as unknown as number, quantity:1})
   )

   console.log(this.productDetails)
   console.log(this.orderDetails)
  }

  public placeOrder(orderForm:NgForm){
    this.productService.placeOrder(this.orderDetails).subscribe((res) =>{
        console.log(res);
        orderForm.reset
    }, (err:HttpErrorResponse) =>{

    })
  }
}

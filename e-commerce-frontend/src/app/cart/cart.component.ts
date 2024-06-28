import { Component } from '@angular/core';
import { Product } from '../models/Product.model';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartDetails:any[]=[];

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Discounted Price', 'Action'];

  constructor(private productService:ProductService, private router:Router){
    this.getCardDetails();
  }

  public getCardDetails(){
    this.productService.getCartDetails().subscribe((res:any[]) =>{
     this.cartDetails = res;
    }, (err:HttpErrorResponse) =>{
      console.log(err)
    })
  }

  checkout(){
    this.router.navigate(["/buyProduct",{isSingleCheckout:false, id: 0}]);
  }

  delete(cartId:any){
    this.productService.deleteCartItem(cartId).subscribe((res)=>{
      console.log(res)
      this.getCardDetails()
    }, (err)=>{
      console.log(err)
    })
  }
}

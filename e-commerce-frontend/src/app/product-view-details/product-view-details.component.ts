import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrl: './product-view-details.component.css'
})
export class ProductViewDetailsComponent implements OnInit{
  selectedProductIndex = 0;

  product:Product={
    id: null,
    productName: '',
    productDescription: '',
    productDiscountPrice: 0,
    productActualPrice: 0,
    productImages: []
  };
  constructor(private activatedRoute:ActivatedRoute, private router:Router, private productService:ProductService){

  }
  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product)
  }

  changeIndex(idx:any){
    this.selectedProductIndex=idx
  }

  buyProduct(){
    this.router.navigate(["/buyProduct",{isSingleCheckout:true, id: this.product.id}]);
  }
  
  addToCart(id){
    this.productService.addToCart(id).subscribe((res)=>{
      console.log(res);
    },(err:HttpErrorResponse) =>{
      console.log(err);
      
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css'
})
export class ShowProductDetailsComponent implements OnInit{
  displayedColumns: string[] = ['Id', 'Product Name', 'Product Description', 'Product Discounted Price', 'Product Actual Price',  'Images', 'Edit', 'Delete'];
 productDetails:Product[]=[];
  constructor(private productService:ProductService){

  }
  ngOnInit(): void {
    this.getAllProducts()
  }

  public getAllProducts(){
    this.productService.getAllProducts().subscribe((res:Product[]) =>{
     this.productDetails = res;
    }, (err:HttpErrorResponse) =>{
      console.log(err)
    });
  }

  public deleteProduct(productId:number){
    this.productService.deleteProduct(productId).subscribe(
      (res) =>{
        this.getAllProducts()
      }, (error:HttpErrorResponse) =>{
        console.log(error)
      }
    );

  }

  public showImage(product:Product){
    console.log(product)
  }
}

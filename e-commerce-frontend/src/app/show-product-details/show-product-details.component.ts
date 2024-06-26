import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Dialog } from '@angular/cdk/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ImageProcessingService } from '../services/image-processing-service.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css'
})
export class ShowProductDetailsComponent implements OnInit{
  displayedColumns: string[] = ['Id', 'productName', 'description', 'Product Discounted Price', 'Product Actual Price',  'Actions'];
 productDetails:Product[]=[];
 showLoadButton:boolean=false;
 pageNumber:number=0;
 showTable:boolean=false;

  constructor(private productService:ProductService, 
    public imagesDialog:MatDialog,
    private imageProcessingService:ImageProcessingService,
    private router :Router
  ){

  }
  ngOnInit(): void {
    this.getAllProducts()
  }

  public getAllProducts(searchKey:string=""){
    this.showTable =false;
    this.productService.getAllProducts(this.pageNumber,searchKey).pipe(map((x:Product[], i) =>
x.map((product:Product) => this.imageProcessingService.createImages(product)))
    ).subscribe((res:Product[]) =>{
      if(res.length == 10){
        this.showLoadButton = true;
      }else{
        this.showLoadButton = false;
      }
     res.forEach(product => this.productDetails.push(product));
     this.showTable =true;
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
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data:{images: product.productImages}
    ,height:'500px', width:'800px'});
  }

  public editProductDetails(id:number){
    this.router.navigate(['/addNewProduct', {productId:id}])
  }

  public loadMoreProduct(){
    this.pageNumber = +this.pageNumber;
    this.getAllProducts();
  }

  public searchProduct(searchKeyWord){
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchKeyWord);
   }
}

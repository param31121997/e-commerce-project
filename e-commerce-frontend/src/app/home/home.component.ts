import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { map } from 'rxjs';
import { Product } from '../models/Product.model';
import { ImageProcessingService } from '../services/image-processing-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  productDetails: Product[] = [];
  pageNumber:number=0;
  showLoadButton:boolean=false;
  sortBy:'productName';
  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(searchKey:string="") {
    this.productService
      .getAllProducts(this.pageNumber, searchKey)
      .pipe(
        map((x: Product[], i) =>
          x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      )
      .subscribe(
        (res: Product[]) => {
          if(res.length == 10){
            this.showLoadButton = true;
          }else{
            this.showLoadButton = false;
          }
          res.forEach(product => this.productDetails.push(product));
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
  }

  public showProductDetails(productId:any){
    this.router.navigate(["/productViewDetails", {productId:productId}])
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

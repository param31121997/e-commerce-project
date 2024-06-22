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

  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService
      .getAllProducts()
      .pipe(
        map((x: Product[], i) =>
          x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      )
      .subscribe(
        (res: Product[]) => {
          console.log(res)
          this.productDetails = res;
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
  }

  public showProductDetails(productId:any){
    this.router.navigate(["/productViewDetails", {productId:productId}])
  }
}

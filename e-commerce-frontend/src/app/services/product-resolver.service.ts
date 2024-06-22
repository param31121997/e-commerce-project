import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from '../models/Product.model';
import { Observable, map, of } from 'rxjs';
import { ProductService } from './product.service';
import { ImageProcessingService } from './image-processing-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product> {

  constructor(private productService:ProductService, private imageProcessingService:ImageProcessingService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = route.paramMap.get("productId");
    if(id){
      return this.productService.getProductById(id).pipe(map(p => this.imageProcessingService.createImages(p)));
    }else{
      return of(this.getProductDetails());
    }

  }

  getProductDetails(){
    return {
      id:null,
      productName: '',
      productDescription: '',
      productDiscountPrice: 0,
      productActualPrice: 0,
      productImages: []
    } as Product
  
  }
}

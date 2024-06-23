import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from '../models/Product.model';
import { Observable, map } from 'rxjs';
import { ProductService } from './product.service';
import { ImageProcessingService } from './image-processing-service.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]>{

  constructor( private productService:ProductService, private imageProcessingService:ImageProcessingService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
    const id = route.paramMap.get("id");
    const isSingleCheckout:any = route.paramMap.get("isSingleCheckout");
    return this.productService.getProductDetails(isSingleCheckout, id)
    .pipe(
      map((x:Product[], i) => 
      x.map((product:Product) => this.imageProcessingService.createImages(product)))
  );
  }
}

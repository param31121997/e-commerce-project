import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private activatedRoute:ActivatedRoute){

  }
  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product)
  }

  changeIndex(idx:any){
    this.selectedProductIndex=idx
  }

  

}

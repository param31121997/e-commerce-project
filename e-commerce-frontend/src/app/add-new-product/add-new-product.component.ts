import { Component} from '@angular/core';
import { Product } from '../models/Product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../models/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css'
})

export class AddNewProductComponent {

  product:Product = {
    productName: '',
    productDescription: '',
    productDiscountPrice: 0,
    productActualPrice: 0,
    productImages: []
  }

  constructor(private productService:ProductService, private sanitizer:DomSanitizer){


  }

   addProduct(productForm:NgForm){

    const productFormData =  this.prepareFormData(this.product);
    this.productService.addProduct(productFormData).subscribe((res:Product) =>{
      console.log(productForm)
      productForm.resetForm();
    }, (error:HttpErrorResponse) =>{
      console.log(error)
    });
  }

  prepareFormData(product:Product):FormData{
    const formData = new FormData();

    formData.append("product", new Blob([JSON.stringify(product)], {type:'application/json'}));
    for(let i=0; i<product.productImages.length; i++){
      formData.append("imageFile",
        product.productImages[i].file,
        product.productImages[i].file.name
      )
    }
   return formData
    
  }

   onFileSelected(event:any){
    if(event.target.files){
      const file = event.target.files[0];
      const fileHandle:FileHandle = {
        file:file,
        url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }

      this.product.productImages.push(fileHandle);
    }else{

    }
    console.log(event)
  }

  removeImage(index:number){
    this.product.productImages.splice(index);
  }

  fileDropped(fileHandle:FileHandle){
    this.product.productImages.push(fileHandle);
  }
}

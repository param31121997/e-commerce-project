import { Injectable } from '@angular/core';
import { Product } from '../models/Product.model';
import { FileHandle } from '../models/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer:DomSanitizer) { 
    
  } 

 public createImages(product: Product): Product {
  const productImages:any[] = product.productImages; // Assuming productImages is an array of image data objects
  const productImagesToFileHandle: FileHandle[] = [];

  for (let i = 0; i < productImages.length; i++) {
    const imageFileData = productImages[i];
    const imageBlob = this.dataURItoBlob(imageFileData.pictureByte, imageFileData.type);
    const imageFile = new File([imageBlob], imageFileData.name, { type: imageFileData.type });

    const finalFilehandle: FileHandle = {
      file: imageFile,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
    };

    productImagesToFileHandle.push(finalFilehandle); // Store FileHandle in a separate array
  }

  product.productImages = productImagesToFileHandle; // Update product with new FileHandle array
  return product;
}

public dataURItoBlob(pictureByte: any, imageType: any): Blob {
  const byteString = atob(pictureByte);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([int8Array], { type: imageType });
  return blob;
}
}

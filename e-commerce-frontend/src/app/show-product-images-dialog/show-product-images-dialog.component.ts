import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FileHandle } from '../models/file-handle.model';

@Component({
  selector: 'app-show-product-images-dialog',
  templateUrl: './show-product-images-dialog.component.html',
  styleUrl: './show-product-images-dialog.component.css'
})
export class ShowProductImagesDialogComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: any
){

  }
  ngOnInit(): void {
    this.receiveImages();
  }


  public receiveImages(){
    console.log(this.data)
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MyOrderDetails } from '../models/order.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {
  orderDetails:MyOrderDetails[] =[];
  displayedColumns: string[] = ['Name', 'Address', 'Contact No.', 'Order Amount', 'Order Status'];
  constructor(private productService:ProductService){

  }
  ngOnInit(): void {
    this.getOrders();
  }

  public getOrders(){
    this.productService.getMyOrders().subscribe((res:MyOrderDetails[]) =>{
     this.orderDetails = res;
    }, (err)=>{
      console.log(err)
    })
  }
}

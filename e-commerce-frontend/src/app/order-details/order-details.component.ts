import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MyOrderDetails } from '../models/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit{

  orderDetails:MyOrderDetails[] =[];
  displayedColumns: string[] = ['Id', 'Product Name', 'Name', 'Address', 'Contact No.', 'Order Status', 'Action'];
  constructor(private productService:ProductService){

  }
  ngOnInit(): void {
   this.getAllOrderDetailsForAdmin();
  }

  getAllOrderDetailsForAdmin(){
    this.productService.getOrdersDetailsForAdmin().subscribe((res) =>{
    this.orderDetails = res;
    }, (err)=>{
      console.log(err)
    })
  }

  changeStatus(orderId){
   this.productService.changeOrderStatus(orderId).subscribe((res) =>{
    console.log(res);
    this.getAllOrderDetailsForAdmin();
   })
  }

}

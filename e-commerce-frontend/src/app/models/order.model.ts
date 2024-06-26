import { Product } from "./Product.model";

export interface MyOrderDetails{
  orderId:number;
  orderFullName:string;
  orderFullAddress:string;
  orderContactNumber:string;
  orderAlternateContactNumber:string;
  orderStatus:string;
  orderAmount:number;
  product:Product;
  user:any;
}
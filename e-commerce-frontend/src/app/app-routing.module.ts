import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './auth/auth.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { ProductResolverService } from './services/product-resolver.service';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { BuyProductResolverService } from './services/buy-product-resolver.service';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},
  { path: 'user', component: UserComponent, canActivate:[AuthGuard], data:{roles:['User']}},
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'addNewProduct', component: AddNewProductComponent, canActivate:[AuthGuard], data:{roles:['Admin']}, resolve:{
    product:ProductResolverService
  }},
  { path: 'showProductDetails', component: ShowProductDetailsComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},
  { path: 'productViewDetails', component: ProductViewDetailsComponent, resolve:{product:ProductResolverService}},
  {path:'buyProduct', component:BuyProductComponent, canActivate:[AuthGuard], data:{roles:['User']}, resolve:{
    productDetails:BuyProductResolverService
  }},
  {path:'cart', component:CartComponent, canActivate:[AuthGuard], data:{roles:['User']}},
  { path: 'orderConfirm', component: OrderConfirmationComponent, canActivate:[AuthGuard], data:{roles:['User']}},
  { path: 'registerUser', component: RegisterComponent},
  {path:'myOrders', component:MyOrdersComponent, canActivate:[AuthGuard], data:{roles:['User']}},
  { path: 'orderDetails', component: OrderDetailsComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

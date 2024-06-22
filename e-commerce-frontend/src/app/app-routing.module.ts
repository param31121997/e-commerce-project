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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},
  { path: 'user', component: UserComponent, canActivate:[AuthGuard], data:{roles:['User']}},
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'addNewProduct', component: AddNewProductComponent, canActivate:[AuthGuard], data:{roles:['Admin']}, resolve:{
    product:ProductResolverService
  }},
  { path: 'showProductDetails', component: ShowProductDetailsComponent},
  { path: 'productViewDetails', component: ProductViewDetailsComponent, resolve:{product:ProductResolverService}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

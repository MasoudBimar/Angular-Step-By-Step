import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
// import { HomeComponent } from './home/home.component';
// import { LoginComponent } from './login/login.component';
// import { ProductDetailComponent } from './product-detail/product-detail.component';
// import { ProductListComponent } from './product-list/product-list.component';
// import { ProductComponent } from './product/product.component';
// import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [];
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
//   { path: 'product-detail/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
//   { path: 'product-create', component: ProductComponent, canActivate: [AuthGuard] },
//   { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard] },
//   { path: 'user-detail/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

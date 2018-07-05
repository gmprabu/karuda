import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { errorRoute } from './layouts';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { 
    RoleGuardService as RoleGuard 
  } from './auth/role-guard.service';
  
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserCreationComponent } from './user/user-creation/user-creation.component';
import { PriceListComponent } from './product/price-list/price-list.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, data: {pageTitle: 'Login'} },
    { path: 'home', component: DashboardComponent, canActivate:[AuthGuard],data: {pageTitle: 'Dashboard'} },
    { path: 'users', component: UserListComponent, canActivate:[AuthGuard],data: {pageTitle: 'User list'} },
    { path: 'products', component: ProductListComponent,canActivate:[AuthGuard], data: {pageTitle: 'Product list'}},
    { path: 'addProduct', component: ProductFormComponent,canActivate:[AuthGuard], data: {pageTitle: 'Add product'}},
    { path: 'editProduct', component: ProductFormComponent,canActivate:[AuthGuard], data: {pageTitle: 'Edit product'}},
    { path: 'createUser', component: UserCreationComponent, canActivate:[AuthGuard],data: {pageTitle: 'Create user'}},
    { path: 'editUser', component: UserCreationComponent, canActivate:[AuthGuard],data: {pageTitle: 'Edit user'}},
    { path: 'priceList', component: PriceListComponent, canActivate:[AuthGuard],data: {pageTitle: 'Price list'}},
    ...errorRoute
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})

export class AppRoutingModule {}

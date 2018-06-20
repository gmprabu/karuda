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
import { UserListComponent } from './user-list/user-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { UserCreationComponent } from './user-creation/user-creation.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, data: {pageTitle: 'Login'} },
    { path: 'home', component: DashboardComponent, canActivate:[AuthGuard],data: {pageTitle: 'Dashboard'} },
    { path: 'users', component: UserListComponent, canActivate:[AuthGuard],data: {pageTitle: 'User List'} },
    { path: 'products', component: ProductListComponent,canActivate:[AuthGuard], data: {pageTitle: 'Product List'}},
    { path: 'addProduct', component: ProductFormComponent,canActivate:[AuthGuard], data: {pageTitle: 'Add Product'}},
    { path: 'createUser', component: UserCreationComponent, canActivate:[AuthGuard],data: {pageTitle: 'Create User'}},
    { path: 'editUser', component: UserCreationComponent, canActivate:[AuthGuard],data: {pageTitle: 'Edit User'}},
    ...errorRoute
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})

export class AppRoutingModule {}

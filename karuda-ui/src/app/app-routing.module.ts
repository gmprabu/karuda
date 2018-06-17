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

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, data: {pageTitle: 'Login'} },
    { path: 'home', component: DashboardComponent, data: {pageTitle: 'Dashboard'} },
    { path: 'users', component: UserListComponent, data: {pageTitle: 'UserList'} },
    // canActivate:[AuthGuard]
    ...errorRoute
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})

export class AppRoutingModule {}

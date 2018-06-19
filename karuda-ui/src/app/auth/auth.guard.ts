import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
 
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router : Router, private auth: AuthService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if (localStorage.getItem('userToken') != null && this.auth.isLoggedIn())
      return true;
      this.router.navigate(['/login']);
      return false;
  }
}
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as moment from "moment";
import { User } from "../model/user";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
     
    constructor(private http: HttpClient,private router: Router) {
    }
      
    login(data:any ) { 
        var reqHeader = new HttpHeaders({'No-Auth':'True' });
        return this.http.post<User>('/api/auth/login', data,{ headers: reqHeader });
    }

     setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn,'milliseconds');

        localStorage.setItem('userToken', authResult.accessToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }          

    logout() {
        localStorage.removeItem("userToken");
        localStorage.removeItem("expires_at");
        this.router.navigateByUrl('/login');
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }    
}
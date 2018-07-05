import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "../shared/common.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   
    constructor(private router: Router,private commonService:CommonService) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') == "True")
            return next.handle(req.clone());
 
        if (localStorage.getItem('userToken') != null) {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('userToken'))
            });
            return next.handle(clonedreq)
                .do(
                succ => { },
                err => {
                    if (err.status === 401)
                        this.router.navigateByUrl('/login');
                    if (err instanceof HttpErrorResponse) {
                           this.commonService.stopSpinner();
                           this.commonService.showErrorNotification(err.message);
                          }
                }
                );
        }
        else {
            this.router.navigateByUrl('/login');
        }
    }
}

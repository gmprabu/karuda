import { Injectable } from "@angular/core";
import { User } from "../model/user";
import { Product } from "../model/product";
import { ToastrService, GlobalConfig } from "ngx-toastr";
import { AuthService } from "../auth/auth.service";


@Injectable()
export class CommonService {

    private user: User;
    overlay:boolean = false;
    private product: Product;
    options: GlobalConfig;

    constructor(private toastr: ToastrService,private auth : AuthService){
        this.options = this.toastr.toastrConfig;
        this.options.closeButton = true;
        this.options.positionClass = 'toast-top-full-width';
        this.options.timeOut = 5000;
    }

    
    public showSuccessNotification(msg){
        this.toastr.success('', msg, this.options);
    }

    public showErrorNotification(msg){
        this.toastr.error('', msg, this.options);
    }

    public setUser(user: User) {
        this.user = user;
    }

    public getUser(): User {
        return this.user;
    }

    public setProduct(user: Product) {
        this.product = user;
    }

    public getProduct(): Product {
        return this.product;
    }

    public startSpinner() {
        this.overlay = true;
    }

    public stopSpinner() {
        this.overlay = false;
    }
}

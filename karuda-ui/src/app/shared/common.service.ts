import { Injectable } from "@angular/core";
import { User } from "../model/user";
import { Product } from "../model/product";


@Injectable()
export class CommonService {

    private user: User;

    private product: Product;

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
}

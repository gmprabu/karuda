import { Injectable } from "@angular/core";
import { User } from "../model/user";


@Injectable()
export class CommonService {

    private user: User;

    public setUser(user: User) {
        this.user = user;
    }

    public getUser(): User {
        return this.user;
    }
}

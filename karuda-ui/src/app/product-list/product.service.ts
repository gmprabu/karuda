import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Product } from '../model/product';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<User[]> {
    return this.http.get<User[]>('/api/products');
  }

  addProduct(user: any): Observable<any> {
    return this.http.post<Product>('/api/products', user).catch((err) => {
      console.log(err);
      return Observable.throw(err);
    });
  }

  updateProduct(user: User): Observable<User> {
    return this.http.put<User>('/api/products/', user);
  }

  removeProduct(user: User): Observable<any> {
    return this.http.delete('/api/products/' + user.id );
  }

}

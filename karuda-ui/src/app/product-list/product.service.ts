import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  addProduct(user: any): Observable<any> {
    return this.http.post<Product>('/api/products', user).catch((err) => {
      console.log(err);
      return Observable.throw(err);
    });
  }

  updateProduct(user: any): Observable<any> {
    return this.http.put<any>('/api/products/', user);
  }

  removeProduct(user: Product): Observable<any> {
    return this.http.delete('/api/products/' + user.id );
  }

}

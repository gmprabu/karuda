import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../model/product';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<Product>('/api/products', product).catch((err) => {
      console.log(err);
      return Observable.throw(err);
    });
  }

  updateProduct(product: any): Observable<Product> {
    return this.http.put<any>('/api/products/', product);
  }

  removeProduct(product: Product): Observable<any> {
    return this.http.delete('/api/products/' + product.id );
  }

  stockUpdate(product: any): Observable<Product> {
    return this.http.post<any>('/api/products/stockUpdate/'+product.id, product);
  }

}

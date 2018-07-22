import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../model/product';
import { ApiResponse } from '../../model/api.response';
import { Price } from '../../model/price';

@Injectable()
export class ProductService {

  checkProductnameDuplicate(name: String):  Observable<any> {
    return this.http.get('/api/products/' + name);
  }
  
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  addProduct(product: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('/api/products', product).catch((err) => {
      console.log(err);
      return Observable.throw(err);
    });
  }

  updateProduct(product: any): Observable<ApiResponse> {
    return this.http.put<ApiResponse>('/api/products/', product);
  }

  removeProduct(product: Product): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>('/api/products/' + product.id );
  }

  stockUpdate(product: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('/api/products/stockUpdate/'+product.id, product);
  }

  priceDelete(productId: number,priceId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>('/api/products/price/'+productId+'/'+priceId);
  }

  priceUpdate(product: Product): Observable<ApiResponse> {
    return this.http.put<ApiResponse>('/api/products/price/', product);
  }
}

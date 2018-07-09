import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user';
import { ApiResponse } from '../../model/api.response';


@Injectable()
export class UserListService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  addUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>('/api/users', user).catch((err) => {
      console.log(err);
      return Observable.throw(err);
    });
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>('/api/users/', user);
  }

  removeUser(user: User): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>('/api/users/' + user.id );
  }

  checkUsernameDuplicate(name: String): Observable<any> {
    return this.http.get('/api/users/' + name);
  }

  checkEmailDuplicate(email: String): Observable<any> {
    return this.http.get('/api/users/email/' + email );
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user';


@Injectable()
export class UserListService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('/api/users', user).catch((err) => {
      console.log(err);
      return Observable.throw(err);
    });
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>('/api/users/', user);
  }

  removeUser(user: User): Observable<any> {
    return this.http.delete('/api/users/' + user.id );
  }

  checkUsernameDuplicate(name: String): Observable<any> {
    return this.http.get('/api/users/' + name);
  }

  checkEmailDuplicate(email: String): Observable<any> {
    return this.http.get('/api/users/email/' + email );
  }

}

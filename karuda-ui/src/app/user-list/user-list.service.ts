import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable()
export class UserListService {

  constructor(private http: HttpClient) { }

  getSectors(): Observable<User[]> {

    return this.http.get<User[]>('/api/users');
  }

  addSector(etop: User): Observable<User> {
    return this.http.post<User>('/api/users', etop).catch((err) => {
      console.log(err);
      return Observable.throw(err);
    });
  }

  updateSector(etop: User): Observable<User> {
    return this.http.put<User>('/api/users/' + etop.id, etop);
  }

  removeSector(etop: User): Observable<any> {
    return this.http.delete('/api/users/' + etop.id );
  }

}

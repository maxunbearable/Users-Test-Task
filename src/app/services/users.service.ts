import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

    getUsers(): Observable<any> {
      return this.http.get('https://api-mock.hwbe.io/testapp/users');
   }

    deleteUser(id: number): Observable<any> {
      return this.http.delete(`https://api-mock.hwbe.io/testapp/users/${id}`);
    }

    editUser(id: number, updatedData: any): Observable<any> {
      return this.http.patch(`https://api-mock.hwbe.io/testapp/users/${id}`, updatedData);
    }

    createUser(id: number, creationData?: any): Observable<any> {
      return this.http.patch(`https://api-mock.hwbe.io/testapp/users/${id}`, creationData);
    }
}

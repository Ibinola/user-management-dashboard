import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Users } from '../model/users';
import { ResourceCreated } from '../model/resource-created';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = "https://jsonplaceholder.typicode.com/users"

  constructor(private http: HttpClient) {}


  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>("https://fakestoreapi.com/users");
    }

  deleteUser(userId: number): Observable<ResourceCreated> {
    return this.http.delete<ResourceCreated>(`https://fakestoreapi.com/users/${userId}`)
  }

  editUser(userId: number): Observable<ResourceCreated> {
    return this.http.patch<ResourceCreated>(`https://fakestoreapi.com/users/${userId}`, userId)
  }
}

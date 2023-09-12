import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Users, addUser } from '../model/users';
import { ResourceCreated } from '../model/resource-created';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}


  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>("https://fakestoreapi.com/users");
    }

  deleteUser(userId: number): Observable<ResourceCreated> {
    return this.http.delete<ResourceCreated>(`https://fakestoreapi.com/users/${userId}`)
  }

  editUser(userId: number, editedUser: addUser[]): Observable<ResourceCreated> {
    return this.http.patch<ResourceCreated>(`https://fakestoreapi.com/users/${userId}`, editedUser);
  }

  addNewUser(addNewUser: addUser[]): Observable<addUser[]> {
    return this.http.post<addUser[]>("https://fakestoreapi.com/users", addNewUser);
  }
}

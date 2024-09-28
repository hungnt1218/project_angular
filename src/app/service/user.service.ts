import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../interface/userinfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3001/user';

  constructor(private http: HttpClient) {}

  getAllUser(): Observable<any>{
    return this.http.get(this.url)
  }

  getUserByID(id: any): Observable<any>{
    return this.http.get<UserInfo>(`${this.url}/${id}`);
  }

  addUser(data: any): Observable<any>{
    return this.http.post(`${this.url}`, data);
  }

  editUser(id: number, data: any): Observable<any>{
    return this.http.put(`${this.url}/${id}`, data);
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }

}
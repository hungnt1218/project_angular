import { Injectable } from '@angular/core';
import { UserInfo } from '../interface/userinfo';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean> (
  //   false
  // );

  url = 'http://localhost:3001/user'; 

  constructor(private http: HttpClient) {}


  getUserByUsername(username: string): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`${this.url}?username=${username}`);
  }

  // public isLoggedIn(): Observable<boolean> {
  //   return this.loggedIn.asObservable();
  // }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartInfo } from '../interface/cartInfo';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  getAllCart(): Observable<any>{
    return this.http.get(this.url)
  }

  getCartByUserID(userID: any): Observable<any>{
    return this.http.get<CartInfo>(`${this.url}/?user_id=${userID}`);
  }
  

  getCartByID(id: any): Observable<any>{
    return this.http.get<CartInfo>(`${this.url}/${id}`);
  }

  addCart(data: CartInfo): Observable<any>{
    return this.http.post(`${this.url}`, data);
  }

  editCart(id: number, data: any): Observable<any>{
    return this.http.put(`${this.url}/${id}`, data);
  }

  deleteCart(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }

  deleteMultiCart(ids: any[]): Observable<any>{
    return this.http.delete(`${this.url}`, {
      params: {
        ids: ids
      }
    })
  }

}
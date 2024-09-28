import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SanPham } from '../interface/product';
import { addSanPham } from '../interface/addProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'http://localhost:8080/api/v1/SanPham';

  constructor(private http: HttpClient) {}



  getAllProduct(SanPhamCurrentPage: any, size: number): Observable<any>{
    let url1 = 'http://localhost:8080/api/v1/SanPham';
    url1 += '?pageNumber=' + 1 + '&size=' + size;
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    const headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa(username + ":" + password)
      });
      
      return this.http.get(url1, { headers });
  }

  getProductByID(id: any): Observable<any>{
    return this.http.get<SanPham>(`${this.url}/${id}`);
  }

  addProduct(data: any): Observable<any>{
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    const headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa(username + ":" + password)
      });
    return this.http.post<any>(`${this.url}`, data, {headers});
  }

  editProduct(id: number, data: any): Observable<any>{
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    const headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa(username + ":" + password)
      });
    return this.http.put(`${this.url}/${id}`, data,  {headers});
  }

  deleteProduct(id: number): Observable<any>{
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    const headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa(username + ":" + password)
      });
    return this.http.delete(`${this.url}/${id}`, {headers});
  }
}
import { Injectable } from '@angular/core';
import { HousingLocation } from '../interface/housinglocation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  url = 'http://localhost:3001/locations';

  constructor(private http: HttpClient) {}

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  getAllHousing(): Observable<any>{
    return this.http.get(this.url)
  }

  getHousingById(id: any): Observable<any>{
    return this.http.get<HousingLocation>(`${this.url}/${id}`);
  }

  addHouse(data: any): Observable<any>{
    return this.http.post(`${this.url}`, data);
  }

  editHouse(id: number, data: any): Observable<any>{
    return this.http.put(`${this.url}/${id}`, data);
  }

  deleteHouse(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }

  

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }
}
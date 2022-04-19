import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const options = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  createReservation(reservation: any): Observable<any> {
    const url = "http://localhost:3000/reservations";
    return this.http.post<any>(url, reservation, options);
  }

  getAllReservations(): Observable<any> {
    const url = "http://localhost:3000/reservations";
    return this.http.get<any>(url, options);
  }

  getReservationById(id: string): Observable<any> {
    const url = `http://localhost:3000/reservations/${id}`;
    return this.http.get<any>(url, options);
  }

  updateReservation(id: string, reservation: any): Observable<any> {
    const url = `http://localhost:3000/reservations/${id}`;
    return this.http.put<any>(url, reservation, options);
  }
 
  deleteReservation(id: string): Observable<any> {
    const url = `http://localhost:3000/reservations/${id}`;
    return this.http.delete<any>(url, options);
  }
}

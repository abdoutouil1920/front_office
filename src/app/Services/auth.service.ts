import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1'; // Replace this with your backend API URL

  constructor(private http: HttpClient) { }

  login(email: any, password: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, { email, password })
      .pipe(
        tap(response => console.log('Login response:', response)),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(error);
        })
      );
  }

  register(name: any,lastName:any,email:any,phone:any,dateofbirth:any,role:any,userName:any,password:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/register`, {name,lastName,userName,email,password,phone,dateofbirth,role}).pipe(
      tap(response => console.log('Register response:', response)),
      catchError(error => {
        console.error('Register error:', error);
        return throwError(error);
      })
    );
  }
}

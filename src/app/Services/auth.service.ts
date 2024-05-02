import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1'; // Replace this with your backend API URL


  private tokenKey = 'auth_token';
  private loggedInUsernameSubject = new BehaviorSubject<string | null>(null);
  loggedInUsername = this.loggedInUsernameSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loggedInUsernameSubject = new BehaviorSubject<string | null>(null);
    this.loggedInUsername = this.loggedInUsernameSubject.asObservable();

    // Check for existing token and username on initialization
    const storedToken = localStorage.getItem(this.tokenKey);
    const storedUsername = localStorage.getItem('loggedInUsername');
    if (storedToken) {
      this.loggedInUsernameSubject.next(storedUsername);
    }
  }
  sendResetPasswordEmail(email: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/v1/users/forgot-password', { email });
  }
  resetPassword(token: string, newPassword: string): Observable<any> {
    const resetUrl = `${this.apiUrl}/users/reset-password?token=`+ token;
    const requestBody = { newPassword };

    return this.http.post(resetUrl, requestBody);
  }
  login(email: any, password: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, { email, password })
      .pipe(
        tap(response => {
          console.log('Login response:', response);
          this.loggedInUsernameSubject.next(response.userName);
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem('loggedInUsername', response.userName); // Add this line
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(error);
        })
      );
  }

  getLoggedInUsernameFromStorage(): string | null {
    return localStorage.getItem(this.tokenKey);
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

  getToken(): string | null {

    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedInUsernameSubject.next(null);
  }
}

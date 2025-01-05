import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/users'; // Replace with your backend API URL

  private loggedinemail="";
  private tokenKey = 'auth_token';
  private loggedInUsernameSubject = new BehaviorSubject<string | null>(null);
  loggedInUsername = this.loggedInUsernameSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loggedInUsernameSubject = new BehaviorSubject<string | null>(null);
    this.loggedInUsername = this.loggedInUsernameSubject.asObservable();

    // Check for existing token and username on initialization
    const storedToken = sessionStorage.getItem(this.tokenKey);
    const storedUsername = sessionStorage.getItem('loggedInUsername');
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
  register(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    dateOfBirth: string,
    role: string,
    username: string,
    password: string
  ): Observable<any> {
    const body = {
      firstName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth,
      role,
      username,
      motDePasse: password, // Ensure the field matches your backend (French: motDePasse)
    };

    return this.http.post(`${this.apiUrl}/register`, body);
  }

  // Login a user
  login(email: string, password: string): Observable<any> {
    const body = {
      email,
      motDePasse: password, // Ensure this matches the backend field
    };

    return this.http.post(`${this.apiUrl}/login`, body).pipe(
      map((response: any) => {
        if (response && response.token) {
          // Store the token in local storage
          localStorage.setItem('token', response.token);
        }
        return response;
      })
    );
  }
  getLoggedInUsernameFromStorage(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }



  getToken(): string | null {

    return sessionStorage.getItem(this.tokenKey);
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem('loggedInUsername');
    sessionStorage.removeItem('loggedInemail');
    sessionStorage.removeItem('id_user');
    this.loggedInUsernameSubject.next(null);
  }


  addToCart(userEmail: string, product: any): void {
    const cartKey = `cart_${userEmail}`;
    let cartItems: any[] = [];
    const storedCart = sessionStorage.getItem(cartKey);

    if (storedCart) {
      cartItems = JSON.parse(storedCart);
    }

    const existingProduct = cartItems.find((item) => item._id === product._id);
    if (existingProduct) {
      console.log('Product already exists in cart.');
    } else {
      cartItems.push(product);
      sessionStorage.setItem(cartKey, JSON.stringify(cartItems));
      console.log('Product added to cart:', product);
    }
  }

  getCart(userEmail: string): any[] {
    const cartKey = `cart_${userEmail}`;
    const cart = sessionStorage.getItem(cartKey);

    return cart ? JSON.parse(cart) : [];
  }

  clearCart(userEmail: string): void {
    const cartKey = `cart_${userEmail}`;
    sessionStorage.removeItem(cartKey);
  }

}

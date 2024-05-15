import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/products/models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/api/v1/products';
  isLoading: boolean = false;

  constructor(private http: HttpClient) { }

  getAllFeaturedProducts(): Observable<Product[]> {
    const url = `${this.baseUrl}/get/featured`;
    return this.http.get<Product[]>(url);
  }

  getProduct(productId: any): Observable<Product> {
    this.isLoading = true;
    const url = `${this.baseUrl}/${productId}`;
    return this.http.get<Product>(url);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  addProduct(productData: FormData,authoke:string): Observable<any> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjMwMGRiZWE1NWQ1ODMwYzYyZjFhNWYiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTU3OTUzNDUsImV4cCI6MTcxNTg4MTc0NX0.xmIrjgyO3JrqHOa_-qPhIic3gX3EXUs8hFBubIIWHPo';
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.baseUrl}/add_new_product`;
    return this.http.post(url, productData, { headers });
  }
}

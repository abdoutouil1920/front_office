import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Product[]>(this.baseUrl );
  }
}

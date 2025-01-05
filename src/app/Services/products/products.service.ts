import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/products/models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/produits'; // Update the base URL to match Spring Boot API

  constructor(private http: HttpClient) {}

  // Fetch all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  // Fetch product by ID
  getProduct(productId: number): Observable<Product> {
    const url = `${this.baseUrl}/${productId}`;
    return this.http.get<Product>(url);
  }

  // Add new product with images
  addProduct(productData: FormData, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(this.baseUrl, productData, { headers });
  }
  getAllFeaturedProducts(){}
  // Update an existing product
  updateProduct(productId: number, productDetails: Product, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.baseUrl}/${productId}`;
    return this.http.put(url, productDetails, { headers });
  }

  // Delete a product by ID
  deleteProduct(productId: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = `${this.baseUrl}/${productId}`;
    return this.http.delete(url, { headers });
  }
}

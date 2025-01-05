import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../Services/products/products.service';
import { Product } from './../products/models/products';
import { AuthService } from '../Services/auth.service';
import { Category } from '../products/models/category';
import { CategoryService } from '../Services/category/category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoggedIn: boolean = false;
  addButton: boolean = false;
  amount: number = 0;
  minPrice: number = 5;
  maxPrice: number = 1000;

  constructor(
    private router: Router,
    private productService: ProductService,
    private authService: AuthService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.authService.loggedInUsername.subscribe((username) => {
      this.isLoggedIn = !!username;
    });
  }

  // Fetch all products from the backend
  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.filteredProducts = [...this.products];
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Filter products by price range
  applyPriceFilter(): void {
    this.filteredProducts = this.products.filter(
      (product) => product.prix >= this.minPrice && product.prix <= this.maxPrice
    );
  }

  // Add product to cart
  addToCart(productId: number): void {
    if (this.amount > 0) {
      const productToAdd = this.products.find((product) => product.id === productId);
      if (productToAdd) {
        console.log('Product added to cart:', productToAdd);
        // Logic to update cart in the backend or local storage
      } else {
        console.error('Product not found.');
      }
    } else {
      console.error('Invalid quantity.');
    }
  }
}

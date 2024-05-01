import { Component, OnInit } from '@angular/core';
import { Product } from '../products/models/products';
import { ProductService } from '../Services/products/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product:any = {};

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    // Retrieve product ID from route parameters
    this.route.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.getProductById(productId);
        console.log(productId);
      }
    });
  }

  getProductById(productId: string): void {
    this.productService.getProduct(productId).subscribe(
      (data: Product) => {
        this.product = data; // Set the fetched product to the component property
        console.log('Product:', this.product);
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }
}

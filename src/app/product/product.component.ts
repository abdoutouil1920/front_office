import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../Services/products/products.service';
import { Product } from './../products/models/products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  loading: boolean = false;
  cartproduct: any[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  selectedCategory: string = 'all';
  addbutton:boolean =false;
  product: Product | undefined;
     amount:number = 0
   @Output() item=new EventEmitter();

   constructor(private router: Router,private productService: ProductService) { }

   ngOnInit(): void {
     this.getAllProducts();

   }
   navigateTo(page: string): void {
    this.router.navigate([page]);

  }


  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        if (data.length > 0) {
          this.product = data[0]; // Set the first product as the default product
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  toggleQuantityInput(): void {
    this.addbutton = true;
  }

  add(productId: string): void {
    if (this.amount > 0) {
      const productToAdd = this.products?.find((product) => product._id === productId);
      if (productToAdd) {
        console.log('ProductToAdd:', productToAdd);
        this.addtocart({ item: productToAdd, quantity: this.amount });
      } else {
        console.error('Product not found.');
      }
      this.amount = 0; // Reset quantity after adding to cart
    } else {
      console.error('Invalid quantity.');
    }
  }


  addtocart(event: any): void {
    console.log("button cliked")
    let cartProducts: any[] = [];
    if (localStorage.getItem('cart')) {
      cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    const existingProduct = cartProducts.find((item) => item.item._id === event.item._id);
    console.log( existingProduct );
    if (existingProduct) {
      alert('This product is already in the cart.');
    } else {
      cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(cartProducts));
    }
  }
}

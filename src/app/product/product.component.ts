import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../Services/products/products.service';
import { Product } from './../products/models/products';
import { AuthService } from '../Services/auth.service';

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
  isLoggedIn: boolean = false;
  amount:number = 0
   @Output() item=new EventEmitter();

   constructor(private router: Router,private productService: ProductService,private authService:AuthService) { }

   ngOnInit(): void {
     this.getAllProducts();
     this.authService.loggedInUsername.subscribe(username => {
      this.isLoggedIn = !!username; // Convert username to boolean (true if username exists)
    });

   }
   navigateTo(page: string): void {
    this.router.navigate([page]);

  }


  getAllProducts(): void {
    console.log(this.isLoggedIn);

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
    if (this.isLoggedIn) {
      this.addbutton = true;


    }
  }

  add(productId: string): void {
    if (this.amount > 0) {
      const productToAdd = this.products.find((product) => product._id === productId);
      console.log(productToAdd);
      if (productToAdd) {
        const userEmail = sessionStorage.getItem("loggedInemail");
        if (userEmail !== null) {
          console.log('ProductToAdd:', productToAdd);
          this.addToCart(userEmail, { item: productToAdd, quantity: this.amount });
        } else {
          console.error('User email is null. Unable to add to cart.');
        }
      } else {
        console.error('Product not found.');
      }
      this.amount = 0;
    } else {
      console.error('Invalid quantity.');
    }
  }
  addToCart(userEmail: string, cartItem: any): void {
    const cartKey = `cart_${userEmail}`;
    let cartItems: any[] = [];

    try {
      const storedCart = sessionStorage.getItem(cartKey);
      if (storedCart) {
        cartItems = JSON.parse(storedCart);
      }

      const existingProduct = cartItems.find((item) => item._id === cartItem.item._id);
      if (existingProduct) {
        console.log('Product already exists in cart:', existingProduct);
      } else {
        cartItems.push(cartItem);
        sessionStorage.setItem(cartKey, JSON.stringify(cartItems));
        console.log('Product added to cart:', cartItem);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Implement proper error handling based on your application's requirements
    }
  }
}

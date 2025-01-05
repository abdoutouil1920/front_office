import { Component, OnInit } from '@angular/core';
import { OrderService } from '../Services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  cartItems: any[] = [];
  userEmail = sessionStorage.getItem("loggedInemail");
  selectedPaymentMethod: string = 'local';
  address!: string;
  zip!: number;
  phoneNumber!: number;
  tokenauth = sessionStorage.getItem('auth_token') || '';

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    const cartData = sessionStorage.getItem(`cart_${this.userEmail}`);
    if (cartData) {
      this.cartItems = JSON.parse(cartData);
    }
  }

  getTotalPayment(): number {
    return this.cartItems.reduce((total, item) => total + item.item.newPrice * item.quantity, 0);
  }

  orderNow(): void {
    if (this.cartItems.length === 0) {
      alert('The cart should have a minimum of 1 product to order.');
      return;
    }

    // Ensure required fields are not empty
    if (!this.address || !this.zip || !this.phoneNumber) {
      alert('Please fill out all required fields: Address, ZIP code, and Phone Number.');
      return;
    }

    const orderData = {
      orderItems: this.cartItems.map(item => ({
        product: item.item._id,
        name: item.item.name,
        quantity: item.quantity,
        totPrice: item.item.newPrice * item.quantity,
        uniPrice: item.item.newPrice
      })),
      shippingAddress: this.address, // Renamed to match backend expectations
      zip: this.zip,
      phone: this.phoneNumber,
      status: 'pending',
      totalPrice: this.getTotalPayment() // Ensure this method always returns a valid number
    };

    // Send order to backend
    this.orderService.placeOrder(orderData, this.tokenauth)
      .subscribe(
        response => {
          console.log('Order placed successfully:', response);
          sessionStorage.removeItem(`cart_${this.userEmail}`);
          alert('Order placed successfully!');
        },
        error => {
          console.error('Error placing order:', error);
          alert(`Error placing order: ${error.error.message || 'Please try again.'}`);
        }
      );
  }

}

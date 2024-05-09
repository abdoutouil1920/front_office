import { Component, OnInit } from '@angular/core';
import { OrderService } from '../Services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  cartItems: any[] = []; // Initialize an array to hold cart items
  userEmail = sessionStorage.getItem("loggedInemail");
  selectedPaymentMethod: string = 'local';
  address!: string;
  zip!: number;
  phoneNumber!: number;
  tokenauth="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjMwMGRiZWE1NWQ1ODMwYzYyZjFhNWYiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTUwMTc2NDksImV4cCI6MTcxNTEwNDA0OX0.MkTOxVJNYecplY9LCmIBPImMjpDIKcHiRZjfaw4iXTc";
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadCartItems();
    console.log(this.cartItems);// Call method to load cart items on component initialization
    sessionStorage.setItem('admin_token',this.tokenauth);
  }

  loadCartItems(): void {
    const cartData = sessionStorage.getItem(`cart_${this.userEmail}`);

    if (cartData) {
      this.cartItems = JSON.parse(cartData);
    }
  }
  getTotalPayment(): number {
    let totalPayment = 0;

    for (const item of this.cartItems) {
      const totalPrice = item.item.newPrice * item.quantity;
      totalPayment += totalPrice;
    }

    return totalPayment;
  }
  orderNow(): void {
    const cartData = sessionStorage.getItem(`cart_${this.userEmail}`);
    const admintoken: string | null = sessionStorage.getItem('admin_token');
    if (cartData) {
      this.cartItems = JSON.parse(cartData);
    }
    const username = sessionStorage.getItem('loggedInUsername');
    const usermail = sessionStorage.getItem('loggedInemail');
    const orderData = {
      orderItems: this.cartItems.map(item => ({ product: item.item._id , name:item.item.name , quantity: item.quantity ,price: item.item.newPrice })),
      shippingAddress: this.address,
      zip: this.zip,
      phone: this.phoneNumber,
      userName: username,
      userEmail:usermail,
      tot_payment:this.getTotalPayment,
      dateOrdered: new Date()
    };

    this.orderService.placeOrder(orderData,admintoken as string)
      .subscribe(
        response => {
          console.log('Order placed successfully:', response);
          // Handle success (e.g., show confirmation message)
        },
        error => {
          console.error('Error placing order:', error);
          // Handle error (e.g., show error message)
        }
      );
  }
}

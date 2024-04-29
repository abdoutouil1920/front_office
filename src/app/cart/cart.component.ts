import { CarteServiceService } from './../Services/carte-service.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent  implements OnInit{
  constructor( private service:CarteServiceService){}
  cartproduct:any []=[];
  total:any = 0 ;
  success:boolean = false;
  showSpinner: boolean = true; // Initially show the spinner
  ngOnInit(): void {
    this.getCardproduct();
    setTimeout(() => {
      this.showSpinner = false;
    }, 500);

  }
  getCardproduct(){
    if ("cart" in localStorage) {
      this.cartproduct = JSON.parse(localStorage.getItem("cart")!);
    }

      this.getcarttotal();


    }
  getcarttotal(){
    this.total =0 ;
    for(let x in this.cartproduct){
      this.total +=this.cartproduct[x].item.price * this.cartproduct[x].quantity
    }
  }
  minamount(index:number){
    this.cartproduct[index].quantity--
    this.getcarttotal();
    localStorage.setItem("cart" ,JSON.stringify(this.cartproduct))
  }
  addamount(index:number){
    this.cartproduct[index].quantity++
    this.getcarttotal();
    localStorage.setItem("cart" ,JSON.stringify(this.cartproduct))
  }
  detectchange(){
    this.getcarttotal();
    localStorage.setItem("cart" ,JSON.stringify(this.cartproduct))

  }
  deleteproduct(index:number){
    this.cartproduct.splice(index,1);
    this.getcarttotal();
    localStorage.setItem("cart" ,JSON.stringify(this.cartproduct))

  }
  cleardata(){
    this.cartproduct = []
    this.getcarttotal();
    localStorage.setItem("cart" ,JSON.stringify(this.cartproduct))

  }

  addcart(){
    let product = this.cartproduct.map(item => {
     return {ProductId:item.item.id , quantity:item.quantity}
    }
      )
    let Model={
       userid:5,
       date : new Date(),
       product:product
    }
    this.service.creatnewcart(Model).subscribe(res=>{
      this.success=true
    })
    console.log(Model)
  }
}

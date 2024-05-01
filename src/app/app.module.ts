import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './contact/contact.component';
import { AuthService } from './Services/auth.service';
import { ProductService } from './Services/products/products.service';
import { ProductsModule } from './products/products.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    EvaluationComponent,
    CartComponent,
    ProductComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ProductsModule,
    AppRoutingModule
  ],
  providers: [AuthService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

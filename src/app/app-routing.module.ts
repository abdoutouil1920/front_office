// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Importez vos composants nécessaires
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { VerficationComponent } from './verfication/verfication.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'verification', component: VerficationComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'evlu', component: EvaluationComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection vers la page par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

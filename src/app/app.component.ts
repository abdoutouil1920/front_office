// app.component.ts

import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // Déclarez les propriétés ici
  showNavbar: boolean = true;
  isMaterial: boolean = true;
  isPwa: boolean = false;
  framework: string = 'material'; // Définissez la valeur initiale en fonction de votre logique
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        this.showNavbar = !(url.includes('login') || url.includes('verification') ||  url.includes('profile')  );
      }
    });
  }
  // Ajoutez d'autres méthodes ou logique ici au besoin
}

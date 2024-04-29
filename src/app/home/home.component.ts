import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images: string[] = ['img1.jpg', 'img2.jpg'];
  activeImageIndex = 0;

  ngOnInit(): void {}

  nextImage(): void {
    const nextIndex = (this.activeImageIndex + 1) % this.images.length;
    this.activeImageIndex = nextIndex;
  }

  previousImage(): void {
    const previousIndex = (this.activeImageIndex - 1 + this.images.length) % this.images.length;
    this.activeImageIndex = previousIndex;
  }
}

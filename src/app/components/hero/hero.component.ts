import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
declare const bootstrap: any;

@Component({
  selector: 'hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  ngAfterContentInit() {
    const myCarousel = document.querySelector('#carouselAutoplaying');
    var carousel = new bootstrap.Carousel(myCarousel)

  }

}

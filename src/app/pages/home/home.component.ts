import { Component } from '@angular/core';
import { ListProductComponent } from '../../components/products/list-product/list-product.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { FooterSpacerComponent } from '../../components/footer-spacer/footer-spacer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListProductComponent, HeroComponent, FooterSpacerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

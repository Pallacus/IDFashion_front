import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { SpacerComponent } from './components/spacer/spacer.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { HeroComponent } from './components/hero/hero.component';
import { LoginComponent } from './pages/login/login.component';

import { CardProductComponent } from './components/products/card-product/card-product.component';
import { ListProductComponent } from './components/products/list-product/list-product.component';
import { UpdateProductComponent } from './pages/update-product/update-product.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { FooterSpacerComponent } from './components/footer-spacer/footer-spacer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    NavBarComponent,
    HeroComponent,
    CardProductComponent,
    ListProductComponent,
    SpacerComponent,
    RegisterComponent,
    LoginComponent,
    ShoppingCartComponent,
    FooterSpacerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  router = inject(Router);

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    });
  }
}

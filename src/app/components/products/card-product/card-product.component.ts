import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Product } from '../../../interfaces/product.interface';
import { ProductsService } from '../../../services/products.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'card-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {

  @Input() product: Product | null = null;

  @Output() productDetail: EventEmitter<Product> = new EventEmitter();

  productsService = inject(ProductsService);

  onClick() {
    // Visit Product-Detail
    if (this.product) {
      this.productDetail.emit(this.product);
    }
  }
}
import { Component, Input } from '@angular/core';
import { IProduct } from '../../../core/interfaces/product.interface';

@Component({
  selector: 'app-card-producto',
  standalone: true,
  imports: [],
  templateUrl: './card-producto.component.html',
  styleUrl: './card-producto.component.css'
})
export class CardProductoComponent {

  @Input() product: IProduct | null = null;
}

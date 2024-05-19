import { Component, inject } from '@angular/core';
import { Product } from '../../../interfaces/product.interface';
import { ProductsService } from '../../../services/products.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'product-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.css'
})
export class ProductDashboardComponent {


  allProducts: Product[] = [];

  product: Product | null = null;

  productsService = inject(ProductsService);

  async ngOnInit() {
    this.allProducts = await this.productsService.getAll();
  }

  async deleteProduct(product: Product) {

    const product_name = product.title;
    const product_id = product.id;

    try {
      const confirmation = await Swal.fire({
        title: 'Are you sure?',
        text: `You are about to delete the product "${product_name}".`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (confirmation.isConfirmed) {
        await this.productsService.deleteProduct(product_id);

        this.allProducts = await this.productsService.getAll();

        Swal.fire(
          'Deleted!',
          `Product "${product_name}" has been deleted.`,
          'success'
        );
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      Swal.fire(
        'Error!',
        `An error occurred while deleting the product "${product_name}".`,
        'error'
      );
    }
  }
}

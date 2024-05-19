import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { Category } from '../../interfaces/categories.interface';
import { CategoriesService } from '../../services/categories.service';
import { CardProductComponent } from '../../components/products/card-product/card-product.component';
import { ListProductComponent } from '../../components/products/list-product/list-product.component';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ReactiveFormsModule, CardProductComponent, ListProductComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  activatedRoute = inject(ActivatedRoute)
  productsService = inject(ProductsService);
  categoriesService = inject(CategoriesService);
  // ordersService = inject(OrdersService)
  arrayProducts: Product[] = [];
  selectedCategory: Category = {
    id: 0,
    title: 'All our products',
  };
  //en el ngOninit lanzar una peticion para recuperar todas las categorias
  categories: any;
  product: any;
  $index: any;

  async ngOnInit() {

    this.activatedRoute.params.subscribe(async params => {
      if(!params['category_id']){
        try {
          this.arrayProducts= await this.productsService.getAll();
        } catch (error: any) {
      
          Swal.fire(
            'Error!',
            `An error has occurred with the server. We apologize for the inconvenience.`,
            'error'
          );
        }
      }else {
        this.loadCategory(params['category_id'])
      }
      this.categories = await this.categoriesService.getAll();
    });
  }

  async loadCategory(category_id: number) {
    try {
      this.arrayProducts = await this.productsService.getProductsByCategory(
        category_id
      );
      this.selectedCategory = await this.categoriesService.getById(category_id);
    } catch (error) {
      Swal.fire(
        'Error!',
        `An error has occurred with the server. We apologize for the inconvenience.`,
        'error'
      );
    }
  
  }

}

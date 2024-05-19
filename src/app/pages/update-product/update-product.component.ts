import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

import Swal from 'sweetalert2';

import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/categories.interface';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  productService = inject(ProductsService);
  categoriesService = inject(CategoriesService);

  arrCategories: Category[] = [];
  formularioUpdate: FormGroup;

  constructor() {
    this.formularioUpdate = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      featured: new FormControl(0, [Validators.required]),
      categories_id: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      try {
        this.arrCategories = await this.categoriesService.getAll();

        const response = await this.productService.getById(
          params['product_id']
        );
        if (!response.id) {
          Swal.fire('Error', 'This product does not exist.')
          return
        }
        this.formularioUpdate.setValue(response);
      } catch (error: any) {
        Swal.fire(error.message)
        Swal.fire(
        'Error!',
        `An error has occurred with the server. We apologize for the inconvenience.`,
        'error'
        );
      }
    });
  }

  async onSubmit() {
    try {
      const response = await this.productService.updateProduct(
        this.formularioUpdate.value
      );
      this.formularioUpdate.setValue(response);
      Swal.fire('Success', 'The product has been updated.');
    } catch (error: any) {
      Swal.fire(
        'Error!',
        `An error has occurred with the server. We apologize for the inconvenience.`,
        'error'
      );
    }
    this.router.navigateByUrl('/dashboard/products');
  }
}

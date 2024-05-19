import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/categories.interface';

@Component({
  selector: 'app-product-creation',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-creation.component.html',
  styleUrl: './product-creation.component.css',
})
export class ProductCreationComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  productService = inject(ProductsService);
  categoriesService = inject(CategoriesService);

  arrCategories: Category[] = [];
  formularioCreate: FormGroup;

  constructor() {
    this.formularioCreate = new FormGroup({
      title: new FormControl(null, [Validators.required]),

      description: new FormControl(null, [Validators.required]),

      price: new FormControl(null, [Validators.required]),

      image: new FormControl(null, [Validators.required]),

      featured: new FormControl(0, [Validators.required]),

      categories_id: new FormControl("", [Validators.required]),
    });
  }

  async ngOnInit() {
    try {
      this.arrCategories = await this.categoriesService.getAll();
    } catch (error: any) {
      Swal.fire(error.message)
      Swal.fire(
        'Error!',
        `An error has occurred with the server. We apologize for the inconvenience.`,
        'error'
      );
    }
  }

  async onSubmit() {
    try {
      const response = await this.productService.create(this.formularioCreate.value);
      Swal.fire('Success', `${this.formularioCreate.value.title}' has been added to the database.`)
      this.formularioCreate.reset();
    } catch (error: any) {
      Swal.fire('Error', 'There has been an error while creating the product.');
    }
    this.router.navigateByUrl('/dashboard/products');
  }
}

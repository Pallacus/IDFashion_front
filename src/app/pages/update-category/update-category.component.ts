import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { Category } from '../../interfaces/categories.interface';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {

  router = inject(Router)
  activatedRoute = inject(ActivatedRoute);

  categoriesService = inject(CategoriesService)

  updateCategory: FormGroup

  constructor() {
    this.updateCategory = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      id: new FormControl(null, [Validators.required]),
    })
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      try {
        const response = await this.categoriesService.getById(params['category_id']);

        if (!response.id) {
          Swal.fire('Error', 'This category does not exist.')
          return
        }
        this.updateCategory.setValue(response);
      } catch (error: any) {
        Swal.fire(
          'Error!',
          `An error has occurred with the server. We apologize for the inconvenience.`,
          'error'
        );
      }
    })
  }

  async onSubmit() {

    try {
      const response = await this.categoriesService.editCategory(this.updateCategory.value);
      this.updateCategory.setValue(response);
      Swal.fire('Succes', `It has been added ${this.updateCategory.value.title} to the database.`)
      this.router.navigateByUrl('/dashboard/categories');
    }
    catch (error) {
      Swal.fire(
        'Error!',
        `An error has occurred with the server. We apologize for the inconvenience.`,
        'error'
      );
    }
  }

}

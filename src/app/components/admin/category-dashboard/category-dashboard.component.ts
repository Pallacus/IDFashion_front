import { Component, inject } from '@angular/core';
import { Category } from '../../../interfaces/categories.interface';
import { CategoriesService } from '../../../services/categories.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'category-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-dashboard.component.html',
  styleUrl: './category-dashboard.component.css'
})
export class CategoryDashboardComponent {

  allCategories: Category[] = [];

  category: Category | null = null;

  categoriesService = inject(CategoriesService);

  async ngOnInit() {
    this.allCategories = await this.categoriesService.getAllCategories();
  }

  async deleteCategory(category: Category) {

    const category_name = category.title;
    const category_id = category.id;

    try {
      const confirmation = await Swal.fire({
        title: 'Are you sure?',
        text: `You are about to delete the category "${category_name}".`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (confirmation.isConfirmed) {
        await this.categoriesService.deleteCategory(category_id);

        this.allCategories = await this.categoriesService.getAllCategories();

        Swal.fire(
          'Deleted!',
          `Category "${category_name}" has been deleted.`,
          'success'
        );
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      Swal.fire(
        'Error!',
        `An error occurred while deleting the category "${category_name}".`,
        'error'
      );
    }
  }
}

import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoriesService } from '../../services/categories.service';
@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {
categoryTitle: string = '';
categoryForm: any;
submit: any;
categoriesServices= inject(CategoriesService)

categoryCreate: FormGroup;


router=inject(Router)

constructor(){
  this.categoryCreate = new FormGroup({
    title: new FormControl(null, [Validators.required])
  })
}

  async onSubmit(){
  

 try {
   const response = await this.categoriesServices.create(this.categoryCreate.value);
   Swal.fire('Succes', `se ha añadido ${this.categoryCreate.value.title} a la base de datos` )
   this.categoryCreate.reset()
   }
  catch (error) {
  Swal.fire(
    'Error!',
    `An error has occurred with the server. We apologize for the inconvenience.`,
    'error'
  );
 }}
}

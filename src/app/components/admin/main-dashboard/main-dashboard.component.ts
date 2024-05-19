import { Component } from '@angular/core';
import { CategoryDashboardComponent } from '../category-dashboard/category-dashboard.component';
import { ProductDashboardComponent } from '../product-dashboard/product-dashboard.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [CategoryDashboardComponent, ProductDashboardComponent, RouterLink],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css'
})
export class MainDashboardComponent {

}

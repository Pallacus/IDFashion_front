import { Component } from '@angular/core';
import { CategoryDashboardComponent } from '../../components/admin/category-dashboard/category-dashboard.component';
import { ProductDashboardComponent } from '../../components/admin/product-dashboard/product-dashboard.component';
import { RouterOutlet } from '@angular/router';
import { MainDashboardComponent } from '../../components/admin/main-dashboard/main-dashboard.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CategoryDashboardComponent, ProductDashboardComponent, MainDashboardComponent, RouterOutlet],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}

import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
declare const bootstrap: any;
import { Product } from '../../../interfaces/product.interface';
import { CardProductComponent } from '../card-product/card-product.component';
import { SpacerComponent } from '../../spacer/spacer.component';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../interfaces/category.interface';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'list-product',
  standalone: true,
  imports: [CardProductComponent, SpacerComponent, RouterLink, JsonPipe],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css',
})
export class ListProductComponent {
  router = inject(Router);

  arrProducts: Product[] = [];
  arrProductsInit: Product[] = [];
  prodByCats: Product[] = [];
  productsGroups: Product[][] = [];
  allCategories: Category[] = [];
  finalCategories: Category[] = [];
  productsByCategory: { [categoryId: number]: Product[] } = {};

  category: Category | null = null;

  productsService = inject(ProductsService);
  categoriesService = inject(CategoriesService);

  async ngOnInit() {
    // FEATURED Products
    await this.arrangeProducts();

    // All Categories
    this.allCategories = await this.categoriesService.getAllCategories();

    // Products BY CATEGORIES: Store products by category id
    for (const category of this.allCategories) {
      const categoryProducts = await this.productsService.getProductsByCategory(
        category.id
      );

      if (categoryProducts.length > 0) {
        // Check if categoryProducts array is not empty
        this.prodByCats = categoryProducts;
        this.distributeProducts(category.id);
      } else {

      }
    }
    for (const key in this.productsByCategory) {
      this.finalCategories.push(this.allCategories.find(cat => cat.id === Number(key))!);
    }

  }

  ngAfterContentInit() {
    const myCarousel = document.querySelector('#carouselProducts');
    var carousel = new bootstrap.Carousel(myCarousel)

  }

  //  FEATURED Products
  async arrangeProducts(): Promise<void> {
    const productsByGroup = 4;
    try {
      const featuredProducts = await this.productsService.getFeaturedProducts();
      for (let i = 0; i < featuredProducts.length; i += productsByGroup) {
        this.productsGroups.push(
          featuredProducts.slice(i, i + productsByGroup)
        );
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);
      Swal.fire(
        'Error!',
        `An error has occurred with the server. We apologize for the inconvenience.`,
        'error'
      );
    }
  }

  // DISTRIBUTE Products BY CATEGORIES considering Category ID
  distributeProducts(categoryId: number) {
    const products = this.prodByCats.filter(
      (product) => product.categories_id === categoryId
    );

    if (products.length !== 0) {
      if (!this.productsByCategory[categoryId]) {
        this.productsByCategory[categoryId] = []; // Si la categoría no existe en el objeto, inicialízala como un arreglo vacío
      }

      this.productsByCategory[categoryId] = this.productsByCategory[categoryId]
        .concat(products)
        .slice(-4);
    }
  }

  async loadCategory(category_id: number) {
    this.router.navigateByUrl(`/categories/` + category_id);
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Product } from "../interfaces/product.interface";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = `${environment.apiUrl}/products`;

  private httpClient = inject(HttpClient);

  getById(idproduct: string) {
    return firstValueFrom(this.httpClient.get<Product>(`${this.baseUrl}/${idproduct}`))
  }

  getAll() {
    return firstValueFrom(
      this.httpClient.get<Product[]>(
        this.baseUrl
      )
    );
  }

  getFeaturedProducts() {
    return firstValueFrom(
      this.httpClient.get<Product[]>(
        `${this.baseUrl}/featured`
      )
    );
  }


  getProductsByCategory(categoryId: number) {
    return firstValueFrom(
      this.httpClient.get<Product[]>(
        `${this.baseUrl}/category/${categoryId}`
      )
    )
  }

  create(nuevoProducto: Product) {
    return firstValueFrom(
      this.httpClient.post(`${this.baseUrl}/new`, nuevoProducto)
    )
  }

  updateProduct(product: Product) {
    return firstValueFrom(this.httpClient.put<Product>(`${this.baseUrl}/update/${product.id}`, product))
  }

  deleteProduct(product_id: number) {
    return firstValueFrom(this.httpClient.delete(`${this.baseUrl}/${product_id}`));
  }

}
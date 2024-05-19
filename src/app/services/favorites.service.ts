import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { firstValueFrom } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private baseUrl = 'http://localhost:3000/api/favorites';

  private httpClient = inject(HttpClient);

  getFavoritesByUserId(user_id: number) {
    return firstValueFrom(this.httpClient.get(`${this.baseUrl}/:user_id`))   //Implementar la ruta
  }

  getFavoritesByProductId(product_id: number) {
    return firstValueFrom(this.httpClient.get(`${this.baseUrl}/:product_id`))   //Implementar la ruta
  }

  getFavoritesByUserIdAndProductId(user_id: number, product_id: number) {

    return firstValueFrom(this.httpClient.get(`${this.baseUrl}/params?user_id=${user_id}&product_id=${product_id}`))   //Implementar la ruta
  }

  createFavorite(favorite: any) {
    return firstValueFrom(this.httpClient.post(`${this.baseUrl}/new`, favorite))
  }
  deleteFavorite(favoriteId: number) {
    return firstValueFrom(this.httpClient.delete(`${this.baseUrl}/${favoriteId}`))
  }
}
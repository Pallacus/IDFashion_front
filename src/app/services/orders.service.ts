import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OrdersService {
    private baseUrl = 'http://localhost:3000/api/orders';

    private httpClient = inject(HttpClient);

    getAll() {
        return firstValueFrom(this.httpClient.get(this.baseUrl));
    }

    getAllWithNames() {
        return firstValueFrom(this.httpClient.get(`${this.baseUrl}/names`));
    }

    getById(order_id: number) {
        return firstValueFrom(this.httpClient.get(`${this.baseUrl}/${order_id}`));
    }

    create(newOrder: any) {
        return firstValueFrom(this.httpClient.post(`${this.baseUrl}/new`, newOrder));
    }

    sendOrder(order: any) {
        return firstValueFrom(this.httpClient.post(`${this.baseUrl}/cart`, order));
    }

    deleteOrder(order_id: number) {
        return firstValueFrom(this.httpClient.delete(`${this.baseUrl}/${order_id}`));
    }
    getTotalItems() {
        const orders = JSON.parse(localStorage.getItem('kart') || '[]');
        return orders.length
    }



}
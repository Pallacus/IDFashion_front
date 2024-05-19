import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { User } from '../../data/interfaces/usuario.interface';
import { OrdersService } from '../../services/orders.service';
import { UsuariosService } from '../../services/usuarios.service';
import dayjs from 'dayjs';

@Component({
  selector: 'app-orders-management',
  standalone: true,
  imports: [],
  templateUrl: './orders-management.component.html',
  styleUrl: './orders-management.component.css',
})
export class OrdersManagementComponent {
  router = inject(Router);

  ordersService = inject(OrdersService);
  usuariosService = inject(UsuariosService);

  decodedToken: any = '';
  arrOrders: any = [];
  arrUsers: User[] = [];

  // orderStatus: recived, paid, processing, sent, recived, closed

  async ngOnInit() {
    if (localStorage['token']) {
      this.decodedToken = jwtDecode(localStorage['token']);
    }

    if (!localStorage['token'] || this.decodedToken.role !== 'admin') {
      this.router.navigateByUrl('/home');
    }

    this.loadOrders();
  }
  async loadOrders() {
    try {
      this.arrOrders = await this.ordersService.getAllWithNames();

      for (const order of this.arrOrders) {
        order.created_at = dayjs(order.created_at).format('DD-MM-YYYY');
      }

      console.log(this.arrOrders);
    } catch (error: any) {
      console.log(error.message);
    }
  }
  async ngOnDelete(order_id: number) {
    try {
      const confirmation = await Swal.fire({
        title: 'Are you sure?',
        text: `You are about to delete the order #: "${order_id}".`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });

      if (confirmation.isConfirmed) {
        const response: any = await this.ordersService.deleteOrder(order_id);
        if (response.affectedRows === 1) {
          Swal.fire('Deleted!', `Order has been deleted.`, 'success');
        }
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      Swal.fire(
        'Error!',
        `An error occurred while deleting the order "${order_id}".`,
        'error'
      );
    }
    this.loadOrders();
  }
}

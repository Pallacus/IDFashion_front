import { Component, HostListener, inject, ɵɵqueryRefresh } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  arrProducts: Product[] = [];
  total: any;
  totalItems: number = 0;
  productGroup: {
    id: number;
    product: Product;
    quantity: number;
    total: number;
  }[] = [];
  orderServices = inject(OrdersService);



  ngOnInit() {
    this.arrProducts = JSON.parse(localStorage.getItem('kart') || '[]');
    this.RefreshTotal();
    this.TotalItems();
    this.GroupProducts();

  }

  RefreshTotal() {
    this.total = this.arrProducts.reduce((acumulador: any, currentProduct: { price: any; }) => acumulador + currentProduct.price, 0);
    this.total = this.total.toFixed(2);
  }

  TotalItems() {
    this.totalItems = this.arrProducts.length;
  }

  DeleteItem(id: number) {

    const index = this.arrProducts.findIndex(prod => prod.id === id)
    if (this.productGroup[index].quantity > 1) {
      this.productGroup[index].quantity--
    } else {
      this.productGroup.splice(index, 1);
    }

    this.RefreshArrProducts();
    this.RefreshTotal();
    this.TotalItems();

  }

  GroupProducts() {
    for (const product of this.arrProducts) {
      const productFound = this.productGroup.find(prod => prod.id === product.id)
      if (productFound) {
        productFound.quantity++
        productFound.total += product.price
      } else {
        this.productGroup.push({
          id: product.id,
          product: product,
          quantity: 1,
          total: product.price,
        });


      }
    }
  }

  RefreshArrProducts() {
    const arrTotal: Product[] = [];
    for (let item of this.productGroup) {
      for (let i = 0; i < item.quantity; i++) {
        arrTotal.push(item.product);
      }

    }
    this.arrProducts = arrTotal;
    localStorage.setItem('kart', JSON.stringify(this.arrProducts));


  }


  formulario: FormGroup;


  router = inject(Router);

  constructor() {
    this.formulario = new FormGroup({
      cardName: new FormControl(null, [
        Validators.required,
      ]),
      cardNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(19),
        Validators.maxLength(19)
      ]),
      expiration: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5)
      ]),
      cvv: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3)
      ]),


    });

  }

  async onSubmit() {
    if (this.formulario.valid && localStorage.getItem('token') && localStorage['kart'].length > 0) {
      let orderCode: string | any;
      try {

        orderCode = await this.orderServices.sendOrder(this.productGroup);

        Swal.fire(
          'Success',
          `New Order has been created ${orderCode}`,
          'success'
        );

        localStorage.removeItem('kart');
        this.productGroup = [];
        this.RefreshArrProducts();
        this.RefreshTotal();
        this.TotalItems();


      } catch (error: any) {
        console.log(error);
        if (error.ordersInserted.length > 0) {
          Swal.fire(
            'Error!',
            `An error has occurred with the create or order ${orderCode}`,
            'error'
          );
        } else {
          Swal.fire(
            'Error!',
            `The order could not be created.`,
            'error'
          );
        }
      }
    } else {
      Swal.fire(
        'Error!',
        `You must to be loged.`,
        'error'
      );
    }

  }


  modifyInput($event: any) {
    let text = $event.target.value.replaceAll('/', '') as string;
    $event.target.value = text.match(/.{1,2}/g)?.join('/') || '';
  }

  spacerInput($event: any) {
    let text = $event.target.value.replaceAll(' ', '') as string;
    $event.target.value = text.match(/.{1,4}/g)?.join(' ') || '';
  }






}

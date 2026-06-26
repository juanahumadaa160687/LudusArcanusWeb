import { Component } from '@angular/core';
import {RouterOutlet, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ShoppingCartService} from '../../services/cart/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
})
export class ShoppingCart {

  formatoCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  });

  total_final : number = 0;

  carrito_compras: any = JSON.parse(localStorage.getItem('carrito_compras') || '[]');

  constructor(private router: Router, protected shoppingCartService: ShoppingCartService) {}

  ngOnInit() {

    this.carrito_compras.forEach((item: any) => {

      let precio = parseFloat(item.precio_producto);

      this.total_final += precio;

    });
  }

}

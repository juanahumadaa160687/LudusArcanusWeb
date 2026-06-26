import { Component } from '@angular/core';
import {RouterOutlet, Router, ActivatedRoute} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {ShoppingCartService} from '../../services/cart/shopping-cart';

@Component({
  selector: 'app-producto',
  imports: [
    RouterOutlet,
    NgOptimizedImage,
  ],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Producto {

  formatoCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  });

  id: number = 0;

  productos = JSON.parse(localStorage.getItem('productos') || '[]');

  producto: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, protected shoppingCartService: ShoppingCartService ) {

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.producto = this.productos.find((producto: any) => producto.id_producto === this.id);
  }

}

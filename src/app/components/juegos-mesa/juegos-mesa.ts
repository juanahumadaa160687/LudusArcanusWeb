import { Component } from '@angular/core';
import {RouterLink, RouterOutlet, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {NgClass} from '@angular/common';
import {ShoppingCartService} from '../../services/cart/shopping-cart';

@Component({
  selector: 'app-juegos-mesa',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgClass
  ],
  templateUrl: './juegos-mesa.html',
  styleUrl: './juegos-mesa.css',
})
export class JuegosMesa {

  formatoCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  });

  productos = JSON.parse(localStorage.getItem('productos') || '[]');

  constructor(private router: Router, protected shoppingCartService: ShoppingCartService) {}

}

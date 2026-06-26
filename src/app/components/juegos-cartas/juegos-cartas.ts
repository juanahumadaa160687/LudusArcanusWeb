import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import Swal from 'sweetalert2';
import {NgClass} from '@angular/common';
import {ShoppingCartService} from '../../services/cart/shopping-cart';

@Component({
  selector: 'app-juegos-cartas',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgClass
  ],
  templateUrl: './juegos-cartas.html',
  styleUrl: './juegos-cartas.css',
})
export class JuegosCartas {

  formatoCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  });

  productos = JSON.parse(localStorage.getItem('productos') || '[]');

  constructor(private router: Router, protected shoppingCartService: ShoppingCartService) {}

}

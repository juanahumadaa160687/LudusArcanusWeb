import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import Swal from 'sweetalert2';
import {ShoppingCartService} from '../../services/cart/shopping-cart';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-juegos-rol',
  imports: [
    RouterLink,
    RouterOutlet,
    NgClass
  ],
  templateUrl: './juegos-rol.html',
  styleUrl: './juegos-rol.css',
})
export class JuegosRol {

  formatoCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  });

  productos = JSON.parse(localStorage.getItem('productos') || '[]');

  constructor(private router: Router, protected shoppingCartService: ShoppingCartService) { }

}

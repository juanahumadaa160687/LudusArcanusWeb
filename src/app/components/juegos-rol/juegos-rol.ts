import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-juegos-rol',
  imports: [
    RouterLink,
    RouterOutlet
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

  constructor(private router: Router) {}

  comprarJuego(id: number) {

    let producto = this.productos.find((j: any) => j.id_producto === id);

    if (producto) {
      let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

      carrito.push(producto);

      localStorage.setItem('carrito', JSON.stringify(carrito));

      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: 'El producto se ha agregado al carrito correctamente.',
        confirmButtonText: 'Aceptar',
        theme: "dark"
      }).then((result) => {
        location.reload();
      })
    }

  }
}

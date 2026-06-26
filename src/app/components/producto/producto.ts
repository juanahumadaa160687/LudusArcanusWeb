import { Component } from '@angular/core';
import {RouterOutlet, Router, ActivatedRoute} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import Swal from 'sweetalert2';

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

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.producto = this.productos.find((producto: any) => producto.id_producto === this.id);
  }

  agregarCarrito(id: number) {

    let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

    carrito.push(this.producto);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    Swal.fire({
      icon: 'success',
      title: 'Producto agregado',
      text: 'El producto se ha agregado al carrito correctamente.',
      confirmButtonText: 'Aceptar',
      theme: "dark"
    }).then((result) => {
      this.router.navigate(['categorias/' + this.producto.categoria_producto]);
    })

  }

}

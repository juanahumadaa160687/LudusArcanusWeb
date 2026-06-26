import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {

  productos = JSON.parse(localStorage.getItem('productos') || '[]');

  carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

  buyProduct(id: number){

    let producto = this.productos.find((producto: any) => producto.id_producto === id);

    if (producto && producto.stock_producto > 0) {
      this.carrito.push(producto);

      localStorage.setItem('carrito', JSON.stringify(this.carrito));

      Swal.fire({
        icon: 'success',
        title: 'Producto agregado correctamente',
        timer: 3500,
        theme: 'dark'
      }).then(() => {
        location.reload();
      })
    }
    else {

      Swal.fire({
        icon: 'warning',
        title: 'Producto no disponible',
        timer: 3500,
        theme: 'dark'
      }).then(() => {
        location.reload();
      })
    }
  }

  deleteProduct(id: number){

    let producto = this.productos.find((producto: any) => producto.id_producto === id);

    if (producto) {

      Swal.fire({
        icon: 'warning',
        title: '¿Estas seguro de eliminar el producto del carrito?',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminarlo',
        theme: 'dark'
      }).then((result) => {
        if (result.isConfirmed) {
          this.carrito.splice(this.carrito.indexOf(producto), 1);
          localStorage.setItem('carrito', JSON.stringify(this.carrito));
          location.reload();
        }
      })
    }
  }

  clearCart(): void {
    this.carrito = [];
    localStorage.removeItem('carrito');
    location.reload();
  }

}

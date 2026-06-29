import { Component } from '@angular/core';
import {RouterOutlet, Router, RouterLink} from '@angular/router';
import Swal from 'sweetalert2';
import {ShoppingCartService} from '../../services/cart/shopping-cart';
import {formatoCLP} from '../../functions/currencyFormat';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    RouterLink,
  ],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
})
export class ShoppingCart {

  formatoCLP = formatoCLP;

  // Variable para guardar el total final de la compra.
  total_final : number = 0;

  carrito_compras: any = JSON.parse(localStorage.getItem('carrito') || '[]');

  constructor(private router: Router, protected shoppingCartService: ShoppingCartService) {}

  /*
   * @description Calcula el total final de la compra sumando los precios de los productos en el carrito.
   */
  ngOnInit() {

    this.carrito_compras.forEach((item: any) => {

      let precio = parseFloat(item.precio_producto);

      this.total_final += precio;

    });
  }

  /*
   * @params Recibe el ID del producto a eliminar del carrito de compras.
   * @description Elimina un producto del carrito de compras y muestra un mensaje de éxito si se eliminó correctamente.
   */
  borrarProducto(id: number) {
    /*
     * @description Llama al servicio de carrito de compras para eliminar el producto con el ID proporcionado.
     */
    let deleted_product = this.shoppingCartService.deleteProduct(id);

    if (deleted_product) {

      Swal.fire({
        icon: 'success',
        title: 'Producto eliminado correctamente',
        timer: 3500,
        theme: 'dark'
      }).then(() => {
        location.reload();
      })
    }
    else{

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el producto, intentalo nuevamente',
        timer: 3500,
        theme: 'dark'
      })

    }
  }

}

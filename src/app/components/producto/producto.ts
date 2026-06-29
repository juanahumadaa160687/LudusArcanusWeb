import {Component, SimpleChanges} from '@angular/core';
import {RouterOutlet, Router, ActivatedRoute, RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {ShoppingCartService} from '../../services/cart/shopping-cart';
import {SignInService} from '../../services/auth/sign-in';
import Swal from 'sweetalert2';
import {formatoCLP} from '../../functions/currencyFormat';

@Component({
  selector: 'app-producto',
  imports: [
    RouterOutlet,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Producto {

  formatoCLP = formatoCLP;

  // Variable que recibe el ID del producto desde la ruta
  id: number = 0;

  productos = JSON.parse(localStorage.getItem('productos') || '[]');

  // Variable que almacena el producto seleccionado
  producto: any;


  constructor(private router: Router, private activatedRoute: ActivatedRoute, protected shoppingCartService: ShoppingCartService, protected signInService: SignInService) {

    // Obtener el ID del producto desde la ruta y buscar el producto correspondiente en el array de productos
    this.id = Number(this.activatedRoute.snapshot.params['id']);
    this.producto = this.productos.find((producto: any) => producto.id_producto === this.id);
  }

  /*
   * @description Agrega el producto al carrito de compras y muestra un mensaje de éxito o error según corresponda.
   */
  addProducto(): void {

    /*
     * @params Recibe el ID del producto a agregar al carrito de compras.
     * @description Llamar a buyProduct del servicio ShoppingCartService para agregar el producto al carrito de compras.
     */
    let compra = this.shoppingCartService.buyProduct(this.id)

    if (compra) {

        Swal.fire({
          icon: 'success',
          title: 'Producto agregado correctamente',
          timer: 4500,
          theme: 'dark'
        }).then(() => {
          location.reload();
        })

      }
      else {

        Swal.fire({
          icon: 'error',
          title: 'Error al agregar producto',
          timer: 4500,
          theme: 'dark'
        }).then(() => {
          location.reload();
        })
      }

  }

}

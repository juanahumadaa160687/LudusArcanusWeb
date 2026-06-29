import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgClass} from '@angular/common';
import {SignInService} from '../../services/auth/sign-in';
import {ShoppingCartService} from '../../services/cart/shopping-cart';
import {formatoCLP} from '../../functions/currencyFormat';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    RouterLink,
  ],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})


export class Categorias implements OnInit{

  //Variable que recibirá la categoría de juego desde params (ej: juego-mesa)
  categoria = '';

  //Variable que recibirá la categoría de juego para el título del componente (ej: Juegos de Mesa)
  categoria_title = '';

  /*
   * @description Formato de moneda para mostrar los precios en pesos chilenos.
   */
  protected readonly formatoCLP = formatoCLP;

  productos = JSON.parse(localStorage.getItem('productos') || '[]');

  constructor(private router: Router, private activatedRoute: ActivatedRoute, protected signInService: SignInService, protected shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {

    /*
     * @params ActivatedRoute para obtener los parámetros de la ruta.
     * @description Suscripción a los parámetros de la ruta para obtener la categoría de juego seleccionada y actualizar la lista de productos mostrados.
     */
    this.activatedRoute.params.subscribe(params => {
      this.categoria = params['categoria'];
      this.updateCategoria();
    })
  }

  /*
   * @description Actualiza la categoría de juego y filtra los productos según la categoría seleccionada.
   * @usageNotes en cada cambio de categoría, productos debe ser actualizado con todos los productos desde localStorage.
   * Si no se realiza este paso, no traerá los productos de la siguiente categoría, ya que solo tendrá los productos de la
   * categoría anterior
   */
  updateCategoria() {

    if (this.categoria == 'juegos-mesa') {
      this.categoria_title = 'Juegos de Mesa';

      this.productos = JSON.parse(localStorage.getItem('productos') || '[]');

      this.productos = this.productos.filter((producto: any) => producto.categoria_producto == this.categoria);

    }
    else if (this.categoria == 'juegos-cartas') {
      this.categoria_title = 'Juegos de Cartas';

      this.productos = JSON.parse(localStorage.getItem('productos') || '[]');

      this.productos = this.productos.filter((producto: any) => producto.categoria_producto == this.categoria);

    }
    else if (this.categoria == 'juegos-rol') {
      this.categoria_title = 'Juegos de Rol';

      this.productos = JSON.parse(localStorage.getItem('productos') || '[]');

      this.productos = this.productos.filter((producto: any) => producto.categoria_producto == this.categoria);

    }

  }

  /*
   * @params id del producto.
   * @description Permite agregar un determinado producto al carro de compras.
   */
  addToCart(id: number): void {

    let add_to_cart = this.shoppingCartService.buyProduct(id);

    if (add_to_cart) {
      Swal.fire({
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 4500,
        theme: "dark"
      }).then(() => {
        location.reload();
      })
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Error al agregar el producto, intentalo nuevamente',
        showConfirmButton: false,
        timer: 3500
      })
    }
  }
}

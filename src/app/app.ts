import {Component, computed, effect, signal, SimpleChanges} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {SignInService} from './services/auth/sign-in';
import {ShoppingCartService} from './services/cart/shopping-cart';
import {users} from '../../public/data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgOptimizedImage, RouterLink, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Ludus Arcanus');

  carrito = JSON.parse(localStorage.getItem('carrito') || '[]').length;

  /*
   * @description Permite obtener la cantidad de productos en el carrito de compras y actualizarla dinámicamente cuando se agregan o eliminan productos del mismo.
   * Esto se logra utilizando la función signal de Angular, que permite crear una señal reactiva que se actualiza automáticamente cuando cambia el valor de la variable carrito.
   */
  count = signal(this.carrito);

  // @description Permite obtener el año actual para insertarlo en el footer de la página (copyright), permitiendo la actualización dinámica del año
  year = new Date().getFullYear();

  /*
   * @description Al iniciar sesión, el email y el rol del usuario se almacenan en el sessionStorage, de esta forma de puede acceder a ellos desde cualquier componente de la aplicación.
   * En este caso, se accede a ellos desde el componente principal (App) para mostrar una barra de navegación diferente de acuerdo al rol del usuario (usuario o administrador)
   * y también si no hay un usuario logueado.
  */
  user_role = sessionStorage.getItem('role') || '';
  email = sessionStorage.getItem('email') || '';

  /*
  * @description En la barra de navegación, el link hacia el perfil de usuario o al dashboard del administrador se muestran con el nombre completo.
  * */
  full_name = '';


  constructor(private router: Router, private signInService: SignInService, private shoppingCartService: ShoppingCartService) {

    //Obtención del nombre completo del usuario logueado a partir del email almacenado en sessionStorage, buscando el usuario en el localStorage
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find((user: any) => user.email === this.email);
    if (user) {
      this.full_name = user.nombre + ' ' + user.apellido;
    }

    // Efecto para actualizar la cantidad de productos en el carrito de compras cuando se agregan o eliminan productos del mismo
    // Si el carrito tiene 0 productos, el ícono del carrito de compras no se mostrará en la barra de navegación.
    effect(() => {
      this.count.set(this.carrito);
    });
  }

  /*
   * @description Cierra la sesión del usuario, limpiando el sessionStorage y redirigiendo al usuario a la página de inicio.
   */
  cerrarSesion() {
    sessionStorage.clear();
    location.href = '/home';
  }

}

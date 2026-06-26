import {Component, signal} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgOptimizedImage, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Ludus Arcanus');

  year = new Date().getFullYear();

  user_role = sessionStorage.getItem('role') || '';
  user_username = sessionStorage.getItem('username') || '';

  carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.carrito.length > 0) {

      let carro = document.getElementById('carro') as HTMLAnchorElement;
      carro.classList.add('position-relative');
      carro.innerHTML = `<span class="badge bg-danger position-absolute top-0 start-100 translate-middle p-2 border border-light rounded-circle">${this.carrito.length}</span> <span class="visually-hidden">items en carrito</span>`;

    }
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }

}

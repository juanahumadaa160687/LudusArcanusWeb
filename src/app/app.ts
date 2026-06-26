import {Component, signal, SimpleChanges} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {SignInService} from './services/auth/sign-in';

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
  user_email = sessionStorage.getItem('email') || ''.split('@')[0];
  email = sessionStorage.getItem('email') || '';

  carrito: number = JSON.parse(localStorage.getItem('carrito') || '[]').length;

  constructor(private router: Router, private signInService: SignInService) {

  }

  ngOnInit() {
  }


  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }

}

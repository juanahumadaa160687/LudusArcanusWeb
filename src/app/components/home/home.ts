import { Component } from '@angular/core';
import {RouterOutlet, Router} from '@angular/router';
import {users, productos} from '../../../../public/data'
import {Producto} from '../producto/producto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  productos = productos;

  users = users;

  constructor(private router: Router) {

    localStorage.setItem('productos', JSON.stringify(this.productos));

    localStorage.setItem('users', JSON.stringify(this.users));

  }

  navigateToCategory(category: string) {

    this.router.navigate([`/categoria/${category}`]);

  }

}

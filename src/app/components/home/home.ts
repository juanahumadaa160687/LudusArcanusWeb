import { Component } from '@angular/core';
import {RouterOutlet, Router, RouterLink} from '@angular/router';
import {users, productos} from '../../../../public/data'
import {Producto} from '../producto/producto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  constructor(private router: Router) {}

}

import {Component, signal} from '@angular/core';
import {RouterOutlet, Router, RouterLink} from '@angular/router';

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

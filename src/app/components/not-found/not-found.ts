import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {}

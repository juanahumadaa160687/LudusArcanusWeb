import {Component, SimpleChanges} from '@angular/core';
import {RouterOutlet, Router, ActivatedRoute, RouterLink} from '@angular/router';
import {JuegosMesa} from '../juegos-mesa/juegos-mesa';
import {JuegosRol} from '../juegos-rol/juegos-rol';
import {JuegosCartas} from '../juegos-cartas/juegos-cartas';
import {NgClass} from '@angular/common';


@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    RouterOutlet,
    JuegosMesa,
    JuegosRol,
    JuegosCartas,
    NgClass,
    RouterLink,
  ],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})


export class Categorias {

  categoria: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      let categoria_param = params.get('categoria') || '';

      if (categoria_param == 'juegos-mesa') {
        this.categoria = 'Juegos de Mesa';
      }
      else if (categoria_param == 'juegos-cartas') {
        this.categoria = 'Juegos de Cartas';
      }
      else if (categoria_param == 'juegos-rol') {
        this.categoria = 'Juegos de Rol';
      }
    });

  }

  ngOnChanges(changes: SimpleChanges<Categorias>) {

    if (changes.categoria?.currentValue == 'juegos-mesa') {
      this.categoria = 'Juegos de Mesa';
      this.router.navigate(['categoria/juegos-mesa']);
    }
    else if (changes.categoria?.currentValue == 'juegos-cartas') {
      this.categoria = 'Juegos de Cartas';
      this.router.navigate(['categoria/juegos-cartas']);
    }
    else if (changes.categoria?.currentValue == 'juegos-rol') {
      this.categoria = 'Juegos de Rol';
      this.router.navigate(['categoria/juegos-rol']);
    }

  }

}

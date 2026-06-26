import { Component } from '@angular/core';
import {RouterOutlet, Router, RouterLink, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import DataTable from 'datatables.net-bs5';
import 'datatables.net-buttons-bs5';
import 'datatables.net-responsive-bs5';
import {pedidos} from '../../../../public/data';
import {UserProfileService} from '../../services/user/user-profile-service';

@Component({
  selector: 'app-user-profile',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {

  formatoCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  });

  users = JSON.parse(localStorage.getItem('users') || '[]');

  user: any = {};


  constructor(private router: Router, private activatedRoute: ActivatedRoute, protected userProfileService: UserProfileService) {

    let email = this.activatedRoute.snapshot.paramMap.get('email') || '';

    this.user = this.users.filter((user: any) => user.email === email)[0] || {};

  }


  ngOnInit() {

    let table = new DataTable('#pedidosTable', {
      responsive: true,
      paging: true,
      searching: true,
      ordering: true,
      pageLength: 10,
      columns: [
        {title: 'ID'},
        {title: 'Fecha'},
        {title: 'Precio'},
        {title: 'Estado'},
      ],
      data:
        [
          ...pedidos.map((pedido: any) => {
            return [
              pedido.id,
              pedido.fecha,
              this.formatoCLP.format(pedido.precio),
              `<span class="badge ${pedido.estado === 'Enviado' ? 'bg-success' : pedido.estado === 'Pendiente' ? 'bg-warning' : 'bg-danger'}">${pedido.estado}</span>`
            ]
          })
        ]
    });

  }

}

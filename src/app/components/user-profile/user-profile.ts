import { Component } from '@angular/core';
import {RouterOutlet, Router, RouterLink, ActivatedRoute} from '@angular/router';
import DataTable from 'datatables.net-bs5';
import 'datatables.net-buttons-bs5';
import 'datatables.net-responsive-bs5';
import {pedidos} from '../../../../public/data';
import {UserProfileService} from '../../services/user/user-profile-service';
import {formatoCLP} from '../../functions/currencyFormat';

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

  formatoCLP = formatoCLP;

  // Variable que recibe el email del usuario desde la ruta
  email: string = '';

  users = JSON.parse(localStorage.getItem('users') || '[]');

  user: any;


  constructor(private router: Router, private activatedRoute: ActivatedRoute, protected userProfileService: UserProfileService) {

    // Obtenemos el email del usuario desde la ruta y buscamos el usuario en el array de usuarios
    this.email = this.activatedRoute.snapshot.params['email'];

    this.user = this.users.find((user: any) => user.email === this.email);

  }


  ngOnInit() {

    /*
     * @params Array de pedidos que se obtiene desde el archivo data.ts
     * @description Inicializamos la tabla de pedidos con DataTables y configuramos las columnas y los datos
     * recibidos desde el array de pedidos. Se formatea el precio a CLP y se asigna un color al estado del pedido.
     */
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

  borrarUsuario(user: any) {

    let result = this.userProfileService.deleteUser(user);

    if (result) {
      sessionStorage.setItem('users', JSON.stringify(result));
      location.href="/home";
    }

  }

}

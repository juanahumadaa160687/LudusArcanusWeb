import { Component } from '@angular/core';
import {RouterOutlet, Router, RouterLink} from '@angular/router';
import Swal from 'sweetalert2';
import DataTable from 'datatables.net-bs5';
import 'datatables.net-buttons-bs5';
import 'datatables.net-responsive-bs5';

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

  active_user = sessionStorage.getItem('username') || '';

  nombre: string = '';
  apellido: string = '';
  email: string = '';
  username: string = '';
  fecha_nacimiento: string = '';
  direccion: string = '';


  constructor(private router: Router) {
  }

  cambiarPassword(email: string) {

    this.router.navigate(['/reset-password/'+email]);

  }

  ngOnInit() {

    let user = this.users.find((user: any) => user.username === this.active_user);

    if (user) {
      this.nombre = user.nombre;
      this.apellido = user.apellido;
      this.email = user.email;
      this.username = user.username;
      this.fecha_nacimiento = user.fecha_nacimiento;
      this.direccion = user.direccion || 'Sin Dirección';

    }

    let pedidos = [
      {
        id: 1,
        fecha: '2024-06-01',
        precio: 100.00,
        estado: 'Enviado'
      },
      {
        id: 2,
        fecha: '2024-06-02',
        precio: 50.00,
        estado: 'Pendiente'
      },
      {
        id: 3,
        fecha: '2024-06-03',
        precio: 70.00,
        estado: 'Enviado'
      },
      {
        id: 4,
        fecha: '2024-06-04',
        precio: 70.00,
        estado: 'Enviado'
      },
      {
        id: 5,
        fecha: '2024-06-05',
        precio: 70.00,
        estado: 'Enviado'
      }
    ]

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


  deleteProfile() {

    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        let user = this.users.filter((user: any) => user.username == this.active_user);
        this.users.splice(this.users.indexOf(user), 1);
        localStorage.setItem('users', JSON.stringify(user));
        this.router.navigate(['/home']);
      }
    });

  }
}

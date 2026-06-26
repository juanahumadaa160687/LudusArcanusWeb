import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class RecoverPassword {

  users = JSON.parse(localStorage.getItem('users') || '[]');

  constructor(private router: Router) {}

  recoverPassword(email: string, password: string) {

    let existing_user = this.users.find((u: any) => u.email === email);

    if (existing_user) {

      let new_user = {
        nombre: existing_user.nombre,
        apellido: existing_user.apellido,
        email: existing_user.email,
        fecha_nacimiento: existing_user.fecha_nacimiento,
        direccion: existing_user.direccion,
        password: password,
        role: existing_user.role,
      }

      this.users.splice(this.users.indexOf(existing_user), 1);
      this.users.push(new_user);
      localStorage.setItem('users', JSON.stringify(this.users));

      Swal.fire({
        icon: 'success',
        title: 'Contraseña cambiada',
        text: 'Contraseña cambiada con éxito',
        showConfirmButton: true,
        theme: 'dark',
      }).then(() => {
        this.router.navigate(['/sign-in']);
      })

    }

  }

}

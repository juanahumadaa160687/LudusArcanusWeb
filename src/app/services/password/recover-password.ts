import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class RecoverPassword {

  users = JSON.parse(localStorage.getItem('users') || '[]');

  constructor(private router: Router) {}

  /*
   * @params Recibe el email y la nueva contraseña del usuario.
   * @description Busca el usuario por email y si existe, actualiza la contraseña con la nueva proporcionada.
   * @returns Retorna true si el usuario existe y la contraseña se actualizó, de lo contrario retorna false.
   */
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

      return true;

    }
    return false;

  }

}

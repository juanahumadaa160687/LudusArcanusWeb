import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {

  users = JSON.parse(localStorage.getItem('users') || '[]');

  constructor(private router: Router) { }


  /*
   * @params Recibe los datos del nuevo usuario: nombre: string, apellido: string, email: string, fecha_nacimiento: string, direccion: string, password: string.
   * @description Crea un nuevo usuario y lo guarda en el localStorage.
   * @returns Retorna true si el usuario fue creado exitosamente.
   */
  signUpFn(nombre: string, apellido: string, email: string, fecha_nacimiento: string, direccion: string, password: string) {

    let user = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      fecha_nacimiento: fecha_nacimiento,
      direccion: direccion,
      password: password,
      role: 'usuario',
    }

    this.users.push(user);

    localStorage.setItem('users', JSON.stringify(this.users));

    return true;
  }

}

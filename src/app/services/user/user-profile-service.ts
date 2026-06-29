import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {

  users = JSON.parse(localStorage.getItem('users') || '[]');

  // Variable que recibe el email del usuario a editar desde la ruta
  email = '';

  constructor( private router : Router, private activatedRoute : ActivatedRoute ) {
    this.email = this.activatedRoute.snapshot.params['email'];
  }

  /*
   * @params Recibe datos del usuario editado
   * @description crea un nuevo usuario con los datos editados y reemplaza el usuario antiguo en el array de usuarios, luego actualiza el localStorage
   * @return true si el usuario fue editado correctamente
   * @usageNotes No todos los datos son editables, el password y el rol no se pueden editar desde esta función, ya que no se reciben como parámetros.
   */
  editUser(nombre: string, apellido: string, email: string, fecha_nacimiento: string, direccion: string) {

    let old_user = this.users.find((user: any) => user.email === this.email);

    let newUser = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      fecha_nacimiento: fecha_nacimiento,
      direccion: direccion,
      password: old_user.password,
      role: old_user.role,
    }

    this.users.splice(this.users.indexOf(old_user), 1);
    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));

    return true;

  }

  /*
   * @params Recibe el usuario actual a eliminar.
   * @description Permite eliminar una cuenta de usuario del almacenamiento local, y actualizar el localStorage con el nuevo array de usuarios.
   * Luego redirige al usuario a la página de inicio.
   * @return void
   */
  deleteUser(user: any){

    this.users.splice(this.users.indexOf(user), 1);
    localStorage.setItem('users', JSON.stringify(this.users));

  }

}

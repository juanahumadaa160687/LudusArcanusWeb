import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {

  users = JSON.parse(localStorage.getItem('users') || '[]');
  email = '';

  constructor( private router : Router, private activatedRoute : ActivatedRoute ) {
    this.email = this.activatedRoute.snapshot.paramMap.get('email') || '';
  }


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

    Swal.fire({
      icon: 'success',
      title: 'Perfil actualizado',
      text: 'Los cambios se han guardado correctamente',
      confirmButtonText: 'Aceptar',
      theme: "dark"
    }).then(() => {
      this.router.navigate(['/user-profile/' + email]);
    });


  }

  deleteUser(user: any){

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
        this.users.splice(this.users.indexOf(user), 1);
        localStorage.setItem('users', JSON.stringify(this.users));
        this.router.navigate(['/home']);
      }
    });

  }

}

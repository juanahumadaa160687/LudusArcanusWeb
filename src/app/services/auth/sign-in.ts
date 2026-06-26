import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SignInService {

  users = JSON.parse(localStorage.getItem('users') || '[]');

  constructor(private router: Router) { }

  signIn(email: string, password: string) {

    let user = this.users.find((u: any) => u.email === email);

    if (user && user.password === password) {

      sessionStorage.setItem('email', user.email);
      sessionStorage.setItem('role', user.role);

      this.router.navigate(['/home']);

    } else {

      Swal.fire({
        icon: 'error',
        title: 'Email o password incorrectos',
        text: 'Intenta nuevamente',
        confirmButtonText: 'Aceptar',
        theme: "dark"
      }).then(() => {
        location.reload();
      });
    }
  }

  passwordRecovery(email: string) {

    let user = this.users.find((u: any) => u.email === email);

    if (user) {
      sessionStorage.setItem('email', user.email);
      this.router.navigate(['/reset-password/' + email]);
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Correo electrónico no encontrado',
        text: 'Intenta nuevamente',
        confirmButtonText: 'Aceptar',
        theme: 'dark',
      }).then(() => {
        location.reload();
      });
    }

  }

  loggedUser(email: string) {
    let user = this.users.find((u: any) => u.email === email);
    if (user) {
      return user;
    }
    return null;
  }

  isLoggedIn() {
    if(sessionStorage.getItem('email')){
      return true;
    }
    return false;
  }
}

import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {SignInService} from '../services/auth/sign-in';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(SignInService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    Swal.fire({
      icon: 'error',
      title: 'Acceso denegado',
      text: 'Debes iniciar sesión para acceder a esta página',
      confirmButtonText: 'Aceptar',
      theme: "dark"
    }).then(() => {
      router.navigate(['/sign-in']);
    })
    return false;
  }

  return true;
};

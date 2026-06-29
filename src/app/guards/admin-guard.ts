import {CanActivateFn, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {inject} from '@angular/core';
import {SignInService} from '../services/auth/sign-in';

export const adminGuard: CanActivateFn = (route, state) => {

  const adminService = inject(SignInService);
  const router = inject(Router);

  /*
   * @description Verifica que el usuario esté logueado y tenga el rol de administrador. Si no cumple con estas condiciones, muestra un mensaje de error y redirige a la página de inicio.
   * @returns {boolean} Retorna true si el usuario está logueado y es administrador, de lo contrario retorna false.
   */
  return adminService.isLoggedIn() ? true : router.createUrlTree(['/administradores']);

};

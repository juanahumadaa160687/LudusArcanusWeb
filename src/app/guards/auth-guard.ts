import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {SignInService} from '../services/auth/sign-in';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(SignInService);
  const router = inject(Router);

  /*
   * @description Verifica que el usuario esté logueado y tenga el rol de usuario. Si no cumple con estas condiciones, muestra un mensaje de error y recarga la página.
   * @return {boolean} Retorna true si el usuario está logueado y es usuario, de lo contrario retorna false.
   */
  return authService.isLoggedInUser() ? true : router.createUrlTree(['/sign-in']);
};

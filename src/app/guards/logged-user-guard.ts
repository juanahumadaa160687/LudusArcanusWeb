import {CanActivateFn, createUrlTreeFromSnapshot, Router} from '@angular/router';
import {SignInService} from '../services/auth/sign-in';
import {inject} from '@angular/core';

export const loggedUserGuard: CanActivateFn = (route, state) => {

  const authService = inject(SignInService);
  const router = inject(Router);

  /*
   * @description Permite que un usuario que ya ha iniciado sesión no pueda acceder a la página de inicio de sesión o registro. Si el usuario está autenticado, se redirige a la página de inicio.
   * @returns {boolean} Retorna false si el usuario está autenticado, lo que impide el acceso a la ruta protegida.
   */

  return authService.isSignedIn() ? router.createUrlTree(['/']) : true;
};

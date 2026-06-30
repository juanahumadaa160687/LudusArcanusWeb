import { Injectable } from '@angular/core';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class SignInService {

  users = JSON.parse(localStorage.getItem('users') || '[]');

  constructor(private router: Router) { }

  /*
   * @params Recibe el email y la contraseña del usuario que intenta iniciar sesión.
   * @returns Devuelve true si el usuario existe y la contraseña es correcta, de lo contrario devuelve false.
   */
  signIn(email: string, password: string) {

    let user = this.users.find((u: any) => u.email === email);

    if (user && user.password === password) {

      sessionStorage.setItem('email', user.email);
      sessionStorage.setItem('role', user.role);

      return true;
    }
    return false;
  }

  /*
   * @params Recibe el email del usuario que desea recuperar su contraseña.
   * @returns Devuelve true si el usuario existe, de lo contrario devuelve false.
   */
  passwordRecovery(email: string) {

    let user = this.users.find((u: any) => u.email === email);

    if (user) {

      return true;
    }
    return false;
  }

  /*
   * @params Recibe el email del usuario que desea obtener sus datos.
   * @returns Devuelve los datos del usuario si existe, de lo contrario devuelve null.
   */
  loggedUser(email: string) {
    let user = this.users.find((u: any) => u.email === email);
    if (user) {
      return user;
    }
    return null;
  }

  isSignedIn(): boolean {

    let user = sessionStorage.getItem('email') || '';
    if (user) {
      return true;
    }
    return false;
  }

  /*
   * @description Permite saber si el usuario está logueado o no, verificando si existe un email en el sessionStorage.
   * @returns Devuelve true si el usuario está logueado, de lo contrario devuelve false.
   */
  isLoggedIn() {

    let loggedUser = sessionStorage.getItem('email') || '';
    let roleUser = sessionStorage.getItem('role') || '';

    if (loggedUser && roleUser == 'administrador') {
      return true;
    }
    return false;
  }

  isLoggedInUser() {

    let loggedUser = sessionStorage.getItem('email') || '';
    let roleUser = sessionStorage.getItem('role') || '';

    if (loggedUser && roleUser == 'usuario') {
      return true;
    }
    return false;
  }

}

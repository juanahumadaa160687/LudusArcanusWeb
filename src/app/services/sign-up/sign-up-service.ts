import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {

  users = JSON.parse(localStorage.getItem('users') || '[]');

  constructor(private router: Router) { }

  checkEmailExistsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      const emailExists = this.users.some((user: any) => user.email === email);
      return emailExists ? { emailExists: true } : null;
    }
  }

  signUpFn(user:{}) {

    this.users.push(user);

    localStorage.setItem('users', JSON.stringify(this.users));

    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'Tu cuenta ha sido creada exitosamente',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      this.router.navigate(['sign-in']);
    })
  }
}

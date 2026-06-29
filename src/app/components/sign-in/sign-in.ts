import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {SignInService} from '../../services/auth/sign-in';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {

  // Variable de control para mostrar el formulario de recuperación de contraseña
  forgot_password: boolean = false;

  // Variable de control para mostrar u ocultar la contraseña
  hidePassword: boolean = true;

  // Formulario de inicio de sesión
  signInForm!: FormGroup;

  // Formulario de recuperación de contraseña
  forgotPasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private signInService: SignInService) {

    // Validaciones del formulario de inicio de sesión y recuperación de contraseña
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  /*
   * @description Maneja el envío del formulario de inicio de sesión.
   */
  onSubmit() {

    if (this.signInForm.errors === null) {

      /*
       * @params Email y contraseña del usuario, obtenidos del formulario de inicio de sesión.
       * @description Recibe el email y la contraseña del formulario de inicio de sesión y llama al servicio de inicio de sesión para autenticar al usuario.
       * @returns Si la autenticación es exitosa, redirige al usuario a la página de inicio. Si no, muestra un mensaje de error.
       */
      let sign_in = this.signInService.signIn(this.signInForm.get('email')?.value, this.signInForm.get('password')?.value);

      if (sign_in) {
        location.href = '/home';
      }
      else {

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
  }

  /*
   * @description Habilita o deshabilita el formulario de recuperación de contraseña.
   * @usageNotes Se utiliza para mostrar u ocultar el formulario de recuperación de contraseña cuando el usuario hace clic en el enlace "¿Olvidaste tu contraseña?".
   * Se debe considerar que está pensado para usuarios que no han iniciado sesión, por lo que ingresan su email, deberían recibir un correo y desde ese correo llegar
   * al reset password, por lo que no es necesario que el usuario esté logueado para poder recuperar su contraseña.
   */
  recoverPassword() {
    this.forgot_password = !this.forgot_password;
  }

  /*
   * @description Navega a la página de recuperación de contraseña con el email del usuario como parámetro en la URL.
   */
  navigateToForgotPassword() {
    if (this.forgotPasswordForm.errors === null) {

      let forgot_password = this.signInService.passwordRecovery(this.forgotPasswordForm.get('email')?.value);
      if (forgot_password) {
        this.router.navigate(['/reset-password/' + this.forgotPasswordForm.get('email')?.value]);
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
  }

  /*
   * @description Permite mostrar u ocultar la contraseña en el formulario de inicio de sesión.
   * Cambia la variable hidePassword a su valor contrario, lo que permite alternar entre mostrar y ocultar la contraseña.
   * En el HTML, se utiliza esta variable para cambiar el tipo de input entre "password" y "text", y también para cambiar el icono del ojo.
   * @usageNotes Se utiliza para mostrar u ocultar la contraseña cuando el usuario hace clic en el icono de ojo.
   */
  verPassword(){
    this.hidePassword = !this.hidePassword;
  }

}

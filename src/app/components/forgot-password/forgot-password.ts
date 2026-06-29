import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {passwordNotMatchValidator} from '../../functions/validators';
import {RecoverPassword} from '../../services/password/recover-password';
import Swal from 'sweetalert2';
import {SignUpService} from '../../services/sign-up/sign-up-service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {

  /*
   * @description Formulario para cambio de contraseña
   */
  changePasswordForm!: FormGroup;

  // Variable que recibe el email del usuario desde params.
  user_email: string = '';

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private recoverPasswordService: RecoverPassword) {

    this.user_email = this.activatedRoute.snapshot.params['email'];

    /*
     *
     * @ description Validators: validator personalizado passwordNotMatchValidator, que compara el password y la confirmación del password
     *
     * @return true si los passwords no coinciden y null si coinciden.
     *
     */
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,18}$')]],
      confirmPassword: ['', [Validators.required, passwordNotMatchValidator()]]
    });
  }

  /*
   * @description Función que se ejecuta al enviar el formulario de cambio de contraseña. Verifica que los campos sean correctos y llama al servicio para cambiar la contraseña.
   */
  onSubmit() {

    if (this.changePasswordForm.errors == null) {

      const password = this.changePasswordForm.get('password')?.value;

      /*
       * @params Recibe el nuevo password y el email que proviene desde params
       *
       * @description con el email y el password llama al servicio para cambiar la contraseña del usuario (ver más en services/password).
       *
       */
      let reset_password = this.recoverPasswordService.recoverPassword(this.user_email, password);

      if (reset_password) {

        Swal.fire({
          icon: 'success',
          title: 'Contraseña cambiada',
          text: 'Contraseña cambiada con éxito',
          showConfirmButton: true,
          theme: 'dark',
        }).then(() => {
          this.router.navigate(['/sign-in']);
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cambiar la contraseña',
          timer: 3500,
          theme: 'dark',
        }).then(() => {
          location.reload();
        })
      }

    }
  }

  togglePasswordVisibility(input: string) {

    if (input === 'password') {
      this.showPassword = !this.showPassword;
    }
    else if (input === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }

  }

}

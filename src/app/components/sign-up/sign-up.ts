import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SignUpService} from '../../services/sign-up/sign-up-service';
import {
  emailExistsValidator,
  fechaFuturoValidator,
  edadMinValidator,
  passwordNotMatchValidator
} from '../../functions/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {

  // Formulario de registro
  signUpForm!: FormGroup;

  // Variables para mostrar/ocultar contraseña y confirmación de contraseña
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;


  constructor(private formBuilder: FormBuilder, private router: Router, private signUpService: SignUpService) {}

  ngOnInit(){

    /*
     * @description Validación del formulario de registro, incluyendo validaciones personalizadas para el correo electrónico, fecha de nacimiento y contraseñas.
     */
    this.signUpForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, emailExistsValidator()]],
      fecha_nacimiento: ['', [Validators.required, fechaFuturoValidator(), edadMinValidator()]],
      direccion: [''],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,18}$')]],
      confirmPassword: ['', [Validators.required, passwordNotMatchValidator()]]
    });
  }

  /*
   * @description Maneja el envío del formulario de registro.
   * Verifica si el formulario es válido y llama al servicio de registro.
   * Muestra mensajes de éxito o error según corresponda.
   */
  onSubmit() {

    if (this.signUpForm.errors == null) {

      /*
       * @params Datos del nuevo usuario obtenidos del formulario de registro.
       * @description Llama al servicio de registro para crear un nuevo usuario.
       */
      let new_user = this.signUpService.signUpFn(
        this.signUpForm.value.nombre,
        this.signUpForm.value.apellido,
        this.signUpForm.value.email,
        this.signUpForm.value.fecha_nacimiento,
        this.signUpForm.value.direccion,
        this.signUpForm.value.password
      );
      if (new_user) {
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
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al registrarse, por favor revise los campos del formulario.',
        showCancelButton: true,
        theme: 'dark'
      }).then(() => {
        location.reload();
      })
    }

  }
  
}

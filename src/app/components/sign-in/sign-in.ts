import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-sign-in',
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

  forgot_password: boolean = false;

  hidePassword: boolean = true;

  signInForm!: FormGroup;

  forgotPasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {

    this.signInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })


    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

  }

  ngOnInit() {

  }

  onSubmit() {
    
    if (this.signInForm.valid) {

      let users = JSON.parse(localStorage.getItem('users') || '[]');

      let user = users.find((u: any) => u.username === this.signInForm.value.username && u.password === this.signInForm.value.password);

      if (user) {
        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('role', user.role);

        this.router.navigate(['/home']);

      } else {

      }
      Swal.fire({
        title: 'Error de inicio de sesión',
        text: 'Usuario o contraseña incorrectos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        location.reload();
      });
    }
  }

  recoverPassword() {

    this.forgot_password = !this.forgot_password;

  }

  navigateToForgotPassword() {

    if (this.forgotPasswordForm.valid) {

      let users = JSON.parse(localStorage.getItem('users') || '[]');
      let user = users.find((u: any) => u.email === this.forgotPasswordForm.value.email);

      if (user) {

        this.router.navigate(['/reset-password/' + this.forgotPasswordForm.get('email')?.value]);

      } else {
        Swal.fire({
          title: 'Error',
          text: 'Correo electrónico no encontrado',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          location.reload();
        })
      }

    }
  }

  verPassword(){
    this.hidePassword = !this.hidePassword;
  }
}

import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  imports: [
    RouterOutlet,
    ReactiveFormsModule
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {

  changePasswordForm!: FormGroup;

  user_email: string = '';

  users = JSON.parse(localStorage.getItem('users') || '[]');

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {

    this.user_email = this.activatedRoute.snapshot.paramMap.get('email') || '';

    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,18}$')]],
      confirm_password: ['', Validators.required]
    })
  }

  recoverPassword(): void {

    let user = this.users.find((user: any) => user.email === this.user_email);

    let newUser = {
      nombre: user.nombre,
      apellido: user.apellido,
      username: user.username,
      email: user.email,
      password: this.changePasswordForm.get('password')?.value,
      direccion: user.direccion,
      fecha_nacimiento: user.fecha_nacimiento,
    }

    this.users.splice(this.users.indexOf(user), 1);

    this.users.push(newUser);

    localStorage.setItem('users', JSON.stringify(this.users));

    Swal.fire({
      title: 'Contraseña cambiada',
      text: 'Tu contraseña ha sido cambiada correctamente',
      icon: 'success',
      showConfirmButton: true,
    }).then(() => {
      sessionStorage.clear();
      this.router.navigate(['/sign-in']);
    });

  }

  navigateToForgotPassword() {
    this.router.navigate(['/reset-password/'+this.user_email]);
  }

}

import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
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

  signUpForm!: FormGroup;

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  users = JSON.parse(localStorage.getItem('users') || '[]');

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(){
    this.signUpForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      fecha_nacimiento: ['', Validators.required],
      direccion: [''],
      password: ['', Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,18}$')],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.signUpForm.valid) {
      let user_role = 'usuario';

      let user = {
        nombre: this.signUpForm.value.nombre,
        apellido: this.signUpForm.value.apellido,
        email: this.signUpForm.value.email,
        username: this.signUpForm.value.email.split('@')[0],
        fecha_nacimiento: this.signUpForm.value.fecha_nacimiento,
        direccion: this.signUpForm.value.direccion,
        password: this.signUpForm.value.password,
        role: user_role,
      }

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

  verPassword(){
    this.hidePassword = !this.hidePassword;
  }

  verConfirmPassword(){
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

}

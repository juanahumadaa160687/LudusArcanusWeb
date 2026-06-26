import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {SignUpService} from '../../services/sign-up/sign-up-service';

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


  constructor(private formBuilder: FormBuilder, private router: Router, private signUpService: SignUpService) {}

  ngOnInit(){
    this.signUpForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required, Validators.email, this.signUpService.checkEmailExistsValidator],
      fecha_nacimiento: ['', Validators.required, Validators.min(13)],
      direccion: [''],
      password: ['', Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,18}$')],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.signUpForm.valid) {

      let user = {
        nombre: this.signUpForm.value.nombre,
        apellido: this.signUpForm.value.apellido,
        email: this.signUpForm.value.email,
        fecha_nacimiento: this.signUpForm.value.fecha_nacimiento,
        direccion: this.signUpForm.value.direccion,
        password: this.signUpForm.value.password,
        role: 'usuario',
      }

      this.signUpService.signUpFn(user);
    }
  }

  verPassword(input: string){

    if (input == 'password'){
      this.hidePassword = !this.hidePassword;
    }
    else{
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }

  }

}

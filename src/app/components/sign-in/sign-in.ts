import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {SignInService} from '../../services/auth/sign-in';

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

  forgot_password: boolean = false;

  hidePassword: boolean = true;

  signInForm!: FormGroup;

  forgotPasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private signInService: SignInService) {

    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    })

    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {

    if (this.signInForm.valid) {

      this.signInService.signIn(this.signInForm.get('email')?.value, this.signInForm.get('password')?.value);

    }
  }

  recoverPassword() {
    this.forgot_password = !this.forgot_password;
  }

  navigateToForgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.signInService.passwordRecovery(this.forgotPasswordForm.get('email')?.value);
    }
  }

  verPassword(){
    this.hidePassword = !this.hidePassword;
  }
}

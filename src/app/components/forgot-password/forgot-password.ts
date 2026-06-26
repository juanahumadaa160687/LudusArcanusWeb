import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {RecoverPassword} from '../../services/password/recover-password';

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

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private recoverPasswordService: RecoverPassword) {

    this.user_email = this.activatedRoute.snapshot.paramMap.get('email') || '';

    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,18}$')]],
      confirm_password: ['', Validators.required]
    })
  }

  onSubmit() {

    if (this.changePasswordForm.valid) {
      const password = this.changePasswordForm.get('password')?.value;

      this.recoverPasswordService.recoverPassword(this.user_email, password);
    }

  }

}

import { Component } from '@angular/core';
import {RouterOutlet, Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserProfileService} from '../../services/user/user-profile-service';

@Component({
  selector: 'app-edit-profile',
  imports: [
    RouterOutlet,
    ReactiveFormsModule
  ],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css',
})
export class EditProfile {

  editUserForm!: FormGroup;

  users = JSON.parse(localStorage.getItem('users') || '[]');

  user = this.users.find((user: any) => user.email === sessionStorage.getItem('email'));

  constructor(private router: Router, private formBuilder: FormBuilder, private userProfileService: UserProfileService) {
    this.editUserForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      birthday: ['', Validators.required, Validators.min(13)],
      address: [''],
    });
  }

  ngOnInit() {

    this.editUserForm.controls['nombre'].setValue(this.user.nombre);
    this.editUserForm.controls['apellido'].setValue(this.user.apellido);
    this.editUserForm.controls['email'].setValue(this.user.email);
    this.editUserForm.controls['birthday'].setValue(this.user.birthday);
    this.editUserForm.controls['address'].setValue(this.user.address);

  }

  onSubmit() {

    if(this.editUserForm.valid){

      this.userProfileService.editUser(
        this.editUserForm.controls['nombre'].value,
        this.editUserForm.controls['apellido'].value,
        this.editUserForm.controls['email'].value,
        this.editUserForm.controls['birthday'].value,
        this.editUserForm.controls['address'].value
      );
    }
  }
}

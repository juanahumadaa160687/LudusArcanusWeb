import { Component } from '@angular/core';
import {RouterOutlet, Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

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

  user = this.users.find((user: any) => user.username === sessionStorage.getItem('username'));


  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.editUserForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', Validators.required],
      address: [''],
    });
  }

  ngOnInit() {

    this.editUserForm.controls['nombre'].setValue(this.user.nombre);
    this.editUserForm.controls['apellido'].setValue(this.user.apellido);
    this.editUserForm.controls['username'].setValue(this.user.username);
    this.editUserForm.controls['email'].setValue(this.user.email);
    this.editUserForm.controls['birthday'].setValue(this.user.birthday);
    this.editUserForm.controls['address'].setValue(this.user.address);
  }

  saveChanges(){

    if(this.editUserForm.valid){

      let editUser = {
        nombre: this.editUserForm.controls['nombre'].value,
        apellido: this.editUserForm.controls['apellido'].value,
        username: this.editUserForm.controls['username'].value,
        email: this.editUserForm.controls['email'].value,
        fecha_nacimiento: this.editUserForm.controls['birthday'].value,
        direccion: this.editUserForm.controls['address'].value,
        password: this.user.password,
        role: this.user.role,
      }

      this.users.splice(this.users.indexOf(this.user), 1);

      this.users.push(editUser);

      localStorage.setItem('users', JSON.stringify(this.users));
      sessionStorage.setItem('username', editUser.username);
      sessionStorage.setItem('role', editUser.role);

      Swal.fire({
        icon: 'success',
        title: 'Perfil actualizado',
        showConfirmButton: true,
        theme: 'dark'
      }).then(() => {
        this.router.navigate(['/profile']);
      })

    }

  }

}

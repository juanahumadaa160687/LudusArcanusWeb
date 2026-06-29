import { Component } from '@angular/core';
import {RouterOutlet, Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserProfileService} from '../../services/user/user-profile-service';
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

  //Formulario para editar el perfil del usuario
  editUserForm!: FormGroup;

  users = JSON.parse(localStorage.getItem('users') || '[]');

  user = this.users.find((user: any) => user.email === sessionStorage.getItem('email'));

  constructor(private router: Router, private formBuilder: FormBuilder, private userProfileService: UserProfileService) {

    // Validadores
    this.editUserForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', [Validators.required, Validators.min(13)]],
      address: [''],
    });
  }

  ngOnInit() {

    /*
     * @description Se cargan los datos del usuario en el formulario de edición
     */
    this.editUserForm.controls['nombre'].setValue(this.user.nombre);
    this.editUserForm.controls['apellido'].setValue(this.user.apellido);
    this.editUserForm.controls['email'].setValue(this.user.email);
    this.editUserForm.controls['birthday'].setValue(this.user.fecha_nacimiento);
    this.editUserForm.controls['address'].setValue(this.user.direccion);

  }

  /*
   * @description Se envía el formulario de edición de perfil y se actualizan los datos del usuario
   */
  onSubmit() {

    if(this.editUserForm.errors == null){

      /*
       * @params Datos obtenidos desde el formulario de edición de usuario ya validados.
       *
       * @description Elimina el usuario antiguo y crea uno nuevo con los datos actualizados.
       * Envía mensaje de éxito y redirige al perfil del usuario.
       *
       */
      let edited_user = this.userProfileService.editUser(
        this.editUserForm.controls['nombre'].value,
        this.editUserForm.controls['apellido'].value,
        this.editUserForm.controls['email'].value,
        this.editUserForm.controls['birthday'].value,
        this.editUserForm.controls['address'].value
      );

      if(edited_user){

        Swal.fire({
          icon: 'success',
          title: 'Perfil actualizado',
          text: 'Los cambios se han guardado correctamente',
          confirmButtonText: 'Aceptar',
          theme: "dark"
        }).then(() => {
          this.router.navigate(['/user-profile/' + this.editUserForm.controls['email'].value]);
        });
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar el perfil',
          text: 'Ha ocurrido un error al intentar actualizar el perfil',
          confirmButtonText: 'Aceptar',
          theme: "dark"
        })
      }
    }
  }

  /*
   *
   * @description Elimina al usuario, borrando el user del localStorage y redirigiendo al home.
   * Utiliza el servicio UserProfileService deleteUser(), que recibe al user, para eliminarlo.
   *
   */
  eliminarUsuario(){

    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userProfileService.deleteUser(this.user);
        Swal.fire(
          '¡Eliminado!',
          'Tu perfil ha sido eliminado.',
          'success',
        ).then(() => {
          this.router.navigate(['/home']);
        });
      }
    });

  }

}

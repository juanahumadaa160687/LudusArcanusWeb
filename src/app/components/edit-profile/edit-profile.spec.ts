import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfile } from './edit-profile';
import {ActivatedRoute} from '@angular/router';

describe('EditProfile', () => {
  let component: EditProfile;
  let fixture: ComponentFixture<EditProfile>;

  /*
   * @params Recibe el email del usuario desde la ruta
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfile],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: { email: 'jdoe@mail.com' } } } },
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(EditProfile);
    component = fixture.componentInstance;
  });

  /*
   * @description Verifica que el componente se haya creado correctamente
   */
  it('should create component instance', () => {

    component.user = {
      nombre: 'John',
      apellido: 'Doe',
      email: 'jdoe@mail.com',
      direccion: '',
      fecha_nacimiento: '1990-01-01',
    }

    expect(component).toBeTruthy();

  });

  /*
   * @description Verifica que la información del usuario sea válida
   */
  it('should validate user information', () => {

    component.editUserForm.controls['nombre'].setValue('')
    component.editUserForm.controls['apellido'].setValue('')
    component.editUserForm.controls['email'].setValue('')
    component.editUserForm.controls['birthday'].setValue('')

    expect(component.editUserForm.valid).toBeFalsy();

  });

  /*
   * @description Verifica que el email del usuario sea válido
   */
  it('should validate user email', () => {
    component.editUserForm.controls['email'].setValue('fake-mail')

    expect(component.editUserForm.controls['email'].valid).toBeFalsy();
  });

  /*
   * @description Verifica que el formulario de edición de perfil se muestre correctamente
   */
  it('should display edit profile form', () => {

    component.user = {
      nombre: 'John',
      apellido: 'Doe',
      email: 'jdoe@mail.com',
      direccion: '',
      fecha_nacimiento: '1990-01-01',
    }

    component.editUserForm.controls['nombre'].setValue(component.user.nombre);
    component.editUserForm.controls['apellido'].setValue(component.user.apellido);
    component.editUserForm.controls['email'].setValue(component.user.email);
    component.editUserForm.controls['address'].setValue(component.user.direccion);
    component.editUserForm.controls['birthday'].setValue(component.user.fecha_nacimiento);

    expect(component.editUserForm.controls['nombre'].value).toEqual('John');
    expect(component.editUserForm.controls['apellido'].value).toEqual('Doe');
    expect(component.editUserForm.controls['email'].value).toEqual('jdoe@mail.com');
    expect(component.editUserForm.controls['address'].value).toEqual('');
    expect(component.editUserForm.controls['birthday'].value).toEqual('1990-01-01');

  });

});

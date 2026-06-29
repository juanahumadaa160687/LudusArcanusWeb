import { TestBed } from '@angular/core/testing';

import { UserProfileService } from './user-profile-service';
import {ActivatedRoute} from '@angular/router';

describe('UserProfileService', () => {
  let service: UserProfileService;

  /*
   * @params Recibe el email del usuario localizado en la ruta para poder editarlo o eliminarlo.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {params: {email: 'jdoe@mail.com'}}}}
      ]
    });
    service = TestBed.inject(UserProfileService);
  });

  /*
   * @description Verifica si el componente UserProfileService se ha creado correctamente.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  /*
   * @description Verifica si editUser edita un usuario correctamente. Recibe un Array con el usuario antiguo y lo reemplaza con el usuario editado.
   */
  it('should edit a user', () => {

    const oldUser = {
      nombre: 'John',
      apellido: 'Doe',
      email: 'jdoe@mail.com',
      fecha_nacimiento: '1990-01-01',
      direccion: ''
    }

    service.users = [oldUser];

    service.editUser('Jane', 'Doe', 'jdoe@mail.com', '1990-01-01', '123 Main St');

    expect(service.users.length).toBe(1);
    expect(service.users[0].direccion).toBe('123 Main St');

  });

  /*
   * @description Recibe un usuario y lo elimina del Array de usuarios. Verifica si el usuario ha sido eliminado correctamente.
   */
  it('should delete an user', () => {
    const user = {
      nombre: 'John',
      apellido: 'Doe',
      email: 'jdoe@mail.com',
      fecha_nacimiento: '1990-01-01',
      direccion: ''
    }

    service.users = [user];

    service.deleteUser(user);

    expect(service.users.length).toBe(0);

  });

});

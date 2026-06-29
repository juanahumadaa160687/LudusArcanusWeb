import { TestBed } from '@angular/core/testing';

import { RecoverPassword } from './recover-password';

describe('RecoverPassword', () => {
  let service: RecoverPassword;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoverPassword);
  });

  /*
   * @description Prueba si el componente se crea correctamente.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*
   * @params un usuario con su email y contraseña. Una contraseña nueva y un Array de usuarios.
   * @description Buscará al usuario por su email y cambiará su contraseña por la nueva. Luego verificará que la contraseña del usuario haya sido actualizada correctamente.
   * @returns Retornará un booleano indicando si la contraseña fue actualizada correctamente.
   */
  it('should recover password for existing user', () => {
    const email = 'jdoe@mail.com';
    const password = 'NewPassword123!';
    const newPassword = 'newPassword123';

    let user = {email, password};

    service.users = [user];

    service.recoverPassword(email, newPassword);

    expect(service.users[0].password).toBe(newPassword);

  });

});

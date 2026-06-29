import { TestBed } from '@angular/core/testing';

import { SignUpService } from './sign-up-service';

describe('SignUpService', () => {
  let service: SignUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignUpService);
  });

  /*
   * @description Verifica si el componente SignUpService se ha creado correctamente.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  /*
   * @description Verifica si signUpFn crea un nuevo usuario correctamente. Agregándolo a la lista de usuarios y comprobando que la longitud de la lista sea 1 después de la creación.
   */
  it('should create a new user', () => {

    service.users = [];

    service.signUpFn('John', 'Doe', 'jdoe@mail.com', '1990-01-01', '123 Main St', 'Password1!');

    expect(service.users.length).toBe(1);

  });

});

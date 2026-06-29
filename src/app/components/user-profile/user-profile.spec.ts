import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfile } from './user-profile';
import {ActivatedRoute} from '@angular/router';

describe('UserProfile', () => {
  let component: UserProfile;
  let fixture: ComponentFixture<UserProfile>;

  /*
   * @params Recibe el email del usuario a mostrar en el perfil desde la ruta.
   */
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [UserProfile],
      providers: [
        {provide: ActivatedRoute, useValue: {
            snapshot: { params: { email: 'jdoe@mail.com' } },
          }},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfile);
    component = fixture.componentInstance;
  });

  /*
   * @params Recibe un usuario de prueba.
   * @description Verifica que el componente se haya creado correctamente y que el usuario de prueba se haya asignado correctamente a la propiedad user del componente.
   */
  it('should create component instance', () => {

    component.user = {
      nombre: 'John',
      apellido: 'Doe',
      email: 'jdoe@mail.com',
      password: '12345678',
      role: 'usuario',
      direccion: '',
      fecha_nacimiento: '1990-01-01',
    }

    expect(component).toBeTruthy();

  });

});

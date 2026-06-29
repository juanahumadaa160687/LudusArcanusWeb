import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPassword } from './forgot-password';
import {ActivatedRoute} from '@angular/router';

describe('ForgotPassword', () => {
  let component: ForgotPassword;
  let fixture: ComponentFixture<ForgotPassword>;

  /*
   * @params Para el servicio, es necesario el email del usuario que esta solicitando el cambio de contraseña. Se puede simular un email de prueba para las pruebas unitarias.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPassword],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: { email: 'jdoe@mail.com' } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPassword);
    component = fixture.componentInstance;
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  /*
   * @description Verifica la validación de la fortaleza y coincidencia de las contraseñas
   */
  it('should validate password strength and matching', () => {

    component.changePasswordForm.controls['password'].setValue('weak');
    component.changePasswordForm.controls['confirmPassword'].setValue('weak');

    expect(component.changePasswordForm.valid).toBeFalsy();

    component.changePasswordForm.controls['password'].setValue('StrongPass1!');
    component.changePasswordForm.controls['confirmPassword'].setValue('StrongPass2!');

    expect(component.changePasswordForm.valid).toBeFalsy();

    component.changePasswordForm.controls['password'].setValue('StrongPass1!');
    component.changePasswordForm.controls['confirmPassword'].setValue('StrongPass1!');

    expect(component.changePasswordForm.valid).toBeTruthy();

  });

});

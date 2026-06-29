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
    const passwordControl = component.changePasswordForm.get('password');
    const confirmPasswordControl = component.changePasswordForm.get('confirmPassword');

    /*
     * @description Prueba de validación de fortaleza de contraseña y coincidencia.
     * @usageNotes Para ser válida, debe cumplir con el largo (6-18), contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.
     */
    passwordControl?.setValue('weak');
    confirmPasswordControl?.setValue('weak');
    expect(component.changePasswordForm.valid).toBeFalsy();

    /*
     * @description Prueba de validación de fortaleza de contraseña y coincidencia.
     * Ambas contraseñas coinciden y cumplen con los criterios ya mencionados, por lo que el formulario debe ser válido.
     */
    passwordControl?.setValue('Abc123$$');
    confirmPasswordControl?.setValue('Abc123$$');
    expect(component.changePasswordForm.valid).toBeTruthy();

    /*
     * @description Prueba de contraseñas no coincidentes.
     * Revisa si el password y su confirmación coinciden. En este caso, aunque la contraseña es fuerte, las contraseñas no coinciden, por lo que el formulario debe ser inválido.
     */
    passwordControl?.setValue('StrongPass1!');
    confirmPasswordControl?.setValue('DifferentPass1!');
    expect(component.changePasswordForm.valid).toBeFalsy();
  });

});

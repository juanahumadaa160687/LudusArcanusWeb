import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignIn } from './sign-in';
import {SignInService} from '../../services/auth/sign-in';
import {ActivatedRoute} from '@angular/router';

describe('SignIn', () => {
  let component: SignIn;
  let fixture: ComponentFixture<SignIn>;

  /*
   * @params Recibe el email del usuario para navegar a la página de recuperación de contraseña
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignIn],
      providers:  [
        {provide: ActivatedRoute, useValue: {
            snapshot: { params: { email: 'jdoe@mail.com' } },
          }},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignIn);
    component = fixture.componentInstance;

  });

  /*
   * @description Verifica que el componente se haya creado correctamente
   */
  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  /*
   * @description Verifica que el email ingresado sea válido.
   */
  it('should validate email', () => {

    component.signInForm.controls['email'].setValue('jdoe@mail.com');

    expect(component.signInForm.controls['email'].valid).toBeTruthy();

    component.signInForm.controls['email'].setValue('invalid-email');
    expect(component.signInForm.controls['email'].valid).toBeFalsy()
  });

  /*
   * @description Verifica que el formulario de inicio de sesión sea válido.
   */
  it('should validate sign in form', () => {
    component.signInForm.controls['email'].setValue('jdoe@mail.com');
    component.signInForm.controls['password'].setValue('Abc123$$');

    expect(component.signInForm.errors).toBeNull()
  })

  /*
   * @description Verifica que el email ingresado para la recuperación de contraseña sea válido.
   */
  it('should validate recover password email', () => {
    component.forgotPasswordForm.controls['email_password'].setValue('invalid-email');
    expect(component.forgotPasswordForm.controls['email_password'].valid).toBeFalsy();

    component.forgotPasswordForm.controls['email_password'].setValue('jdoe@mail.com');
    expect(component.forgotPasswordForm.controls['email_password'].valid).toBeTruthy();
  })

});

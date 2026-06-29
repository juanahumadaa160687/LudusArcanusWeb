import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUp } from './sign-up';

describe('SignUp', () => {
  let component: SignUp;
  let fixture: ComponentFixture<SignUp>;

  beforeEach(async() => {

    await TestBed.configureTestingModule({
      imports: [SignUp]
    }).compileComponents()

    fixture = TestBed.createComponent(SignUp);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  /*
   * @description Verifica que el componente se haya creado correctamente.
   */
  it('should create instance', () => {
    expect(component).toBeTruthy();
  });

  /*
   * @description Valida que el formulario de registro sea inválido cuando los campos están vacíos.
   */
  it('should validate form', () => {
    component.signUpForm.controls['nombre'].setValue('')
    component.signUpForm.controls['apellido'].setValue('')
    component.signUpForm.controls['email'].setValue('')
    component.signUpForm.controls['fecha_nacimiento'].setValue('')
    component.signUpForm.controls['password'].setValue('')
    component.signUpForm.controls['confirmPassword'].setValue('')

    expect(component.signUpForm.controls['nombre'].valid).toBeFalsy();
    expect(component.signUpForm.controls['apellido'].valid).toBeFalsy();
    expect(component.signUpForm.controls['email'].valid).toBeFalsy();
    expect(component.signUpForm.controls['fecha_nacimiento'].valid).toBeFalsy();
    expect(component.signUpForm.controls['password'].valid).toBeFalsy();
    expect(component.signUpForm.controls['confirmPassword'].valid).toBeFalsy();

  });

  /*
   * @description Verifica si el campo de fecha de nacimiento es válido, asegurando que la fecha ingresada no sea futura.
   */
  it('should validate date', () => {
    component.signUpForm.controls['fecha_nacimiento'].setValue('2026-10-01')
    expect(component.signUpForm.controls['fecha_nacimiento'].valid).toBeFalsy();

    component.signUpForm.controls['fecha_nacimiento'].setValue('2000-10-01')
    expect(component.signUpForm.controls['fecha_nacimiento'].valid).toBeTruthy();


  });

  /*
   * @description Verifica si el campo de correo electrónico es válido.
   */
  it('should validate email', () => {
    component.signUpForm.controls['email'].setValue('notanemail')

    expect(component.signUpForm.controls['email'].valid).toBeFalsy();

  });

  /*
   * @description Verifica si el campo de contraseña cumple con los criterios de seguridad establecidos, como longitud mínima y complejidad.
   */
  it('should validate password', () => {
    component.signUpForm.controls['password'].setValue('weakpassword')

    expect(component.signUpForm.controls['password'].valid).toBeFalsy();
  });

  /*
   * @description Verifica si las contraseñas ingresadas coinciden.
   */
  it('should validate password mismatch', () => {

    component.signUpForm.controls['password'].setValue('StrongPass1!')
    component.signUpForm.controls['confirmPassword'].setValue('DifferentPass1!')

    expect(component.signUpForm.valid).toBeFalsy();

  });

  /*
   * @description Verifica si el correo electrónico ingresado ya existe.
   */
  it('should validate email exists', () => {

    component.signUpForm.controls['email'].setValue('jdoe@mail.com');

    expect(component.signUpForm.valid).toBeFalsy();

  });

  /*
   * @description Verifica si el formulario de registro es válido cuando todos los campos están correctamente llenados.
   */
  it('should validate form', () => {
    component.signUpForm.controls['nombre'].setValue('John')
    component.signUpForm.controls['apellido'].setValue('Doe')
    component.signUpForm.controls['email'].setValue('john.doe@mail.com')
    component.signUpForm.controls['fecha_nacimiento'].setValue('2000-01-01')
    component.signUpForm.controls['password'].setValue('StrongPass1!')
    component.signUpForm.controls['confirmPassword'].setValue('StrongPass1!')

    expect(component.signUpForm.errors).toBeNull();
  });

});

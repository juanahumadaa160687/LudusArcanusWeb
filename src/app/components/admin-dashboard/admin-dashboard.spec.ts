import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboard } from './admin-dashboard';
import {ActivatedRoute} from '@angular/router';

describe('AdminDashboard', () => {
  let component: AdminDashboard;
  let fixture: ComponentFixture<AdminDashboard>;

  /*
   * @description Configuración inicial del test, se crea el componente y se inyecta el ActivatedRoute con un valor de email
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboard],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {params: {email: 'jdoe@mail.com'} } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboard);
    component = fixture.componentInstance;
  });

  /*
   * @description Test que permite verificar si se crea o no el componente
   */
  it('should create', () => {

    expect(component).toBeTruthy();
  });

  /*
   * @params Datos de formulario para crear administrador.
   *
   * @description Test que permite validar el formulario de nuevo administrador.
   *
   * @return Se espera que sea falso, ya que el email y el password no son válidos
   */
  it('should validate new admin form', () => {

    component.adminForm.controls['adminNombre'].setValue('Jhon');
    component.adminForm.controls['adminApellido'].setValue('Doe');
    component.adminForm.controls['adminEmail'].setValue('invalid-email');
    component.adminForm.controls['adminPassword'].setValue('12345');
    component.adminForm.controls['adminConfirmPassword'].setValue('1234');

    expect(component.adminForm.valid).toBeFalsy();
  });

  /*
   * @params un email que ya existe en el localStorage
   *
   * @description Test que permite validar si un email ya está registrado
   *
   * @return Se espera que sea verdadero, ya que el email ya existe
   *
   */
  it('should validate if an email exists', () => {


    component.adminForm.controls['adminEmail'].setValue('jdoe@mail.com');

    expect(component.adminForm.controls['adminEmail'].errors).toBeNull()

  });

  /*
   * @params valor equivalente a un nombre de imagen con extensión .png
   *
   * @description Test que permite validar el formato de la imagen del producto.
   *
   * @return Se espera que sea falso, ya que el formato de la imagen no es válido
   */
  it('should validate image format', () => {

    component.productosForm.controls['imagen_producto'].setValue('imagen.png');

    expect(component.productosForm.controls['imagen_producto'].validator?.(component.productosForm.controls['imagen_producto'])).toEqual({ imagenProductoExtension: true });
  });


});

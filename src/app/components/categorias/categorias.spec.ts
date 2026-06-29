import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Categorias } from './categorias';
import {ActivatedRoute} from '@angular/router';
import {productos} from '../../../../public/data';
import {Producto} from '../producto/producto';

describe('Categorias', () => {
  let component: Categorias;
  let fixture: ComponentFixture<Categorias>;

  /*
   * @params Recibe el parámetro de la categoría desde la ruta para poder probar el componente con diferentes categorías.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Categorias],
      providers: [
        { provide: ActivatedRoute, useValue: { params: { categoria: 'juegos_mesa' } } },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Categorias);
    component = fixture.componentInstance;

  });

  /*
   * @description Prueba que el componente se haya creado correctamente.
   * Verifica si todos los productos en el arreglo tienen la misma categoria que la recibida desde la ruta.
   */
  it('should be created', () => {

    expect(component).toBeTruthy();

  })

  /*
   * @description Prueba que el componente filtre correctamente los productos según la categoría seleccionada.
   * Verifica si todos los productos en el arreglo tienen la misma categoria que la recibida desde la ruta.
   */
  it('should filter products by category', () => {

    component.categoria = 'juegos-mesa';
    component.updateCategoria();

    expect(component.productos.every((producto: any) => producto.categoria_producto === 'juegos-mesa')).toBeTruthy()
  });

});

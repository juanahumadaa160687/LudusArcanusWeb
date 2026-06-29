import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Producto} from './producto';
import {ActivatedRoute} from '@angular/router';

describe('Producto', () => {
  let component: Producto;
  let fixture: ComponentFixture<Producto>;

  /*
   * @params Recibe el ID del producto seleccionado desde la ruta.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Producto],
      providers: [
        {provide: ActivatedRoute, useValue: {
            snapshot: { params: { id_producto: 1 } },
          }},
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(Producto);
    component = fixture.componentInstance;
  });

  /*
   * @params Se entrega producto con un ID igual al obtenido desde la ruta, para que el componente pueda ser creado correctamente.
   * @description Verifica que el componente se crea correctamente con el producto proporcionado.
   */
  it('should create the component instance', () => {

    component.producto = {
      id_producto: 1,
      nombre_producto: 'Producto de prueba',
      precio_producto: 1000,
      descripcion_producto: 'Descripción de prueba',
      imagen_producto: 'imagen.webp',
      stock_producto: 10,
      categoria_producto: 'categoria de producto',
    };

    expect(component).toBeTruthy();
  });

});

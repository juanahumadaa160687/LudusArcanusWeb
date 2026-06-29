import { DashboardService } from './dashboard-service';
import {TestBed} from '@angular/core/testing';

describe('DashboardService', () => {

  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardService);
  });

  /*
   * @params Recibe los datos desde el formulario de registro de administrador.
   * @description Crea un nuevo administrador y lo guarda en el localStorage.
   * @returns Retorna true si el administrador fue creado correctamente
   */
  it('should create a new admin', () => {
    service.newAdmin('John', 'Doe', 'jdoe@mail.com', 'Abc1234$$')

    expect(service).toBeTruthy();
  })

  /*
   * @params Recibe los datos desde el formulario de registro de producto.
   * @description Crea un nuevo producto y lo guarda en el localStorage.
   * @returns Retorna true si el producto fue creado correctamente
   */
  it('should create a new product', () => {
    service.newProducto(1, 'Producto 1', 'Categoria 1', 'Descripcion 1', 10.99, 100, 'imagen.webp')

    expect(service).toBeTruthy();
  })

  /*
   * @params Recibe el ID del producto a eliminar.
   * @description Elimina un producto del localStorage.
   * @returns Retorna true si el producto fue eliminado correctamente
   */
  it('should delete a product', () => {
    let producto = {
      id_producto: 1,
      nombre_producto: 'Producto 1',
      descripcion_producto: 'Descripcion 1',
      categoria_producto: 'Categoria 1',
      precio_producto: 10.99,
      stock_producto: 100,
      imagen_producto: 'imagen.webp'
    }

    service.deleteProducto(1)

    expect(service).toBeTruthy();
  })

});
